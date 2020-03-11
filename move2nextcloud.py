# Based on https://nextcloud-bookmarks.readthedocs.io/en/latest/index.html

# Install PyMySQL with `pip install PyMySQL`

import pymysql.cursors
import urllib.request
import json
import base64

NEXTCLOUD_USER = ""
NEXTCLOUD_PASSWORD = ""
NEXTCLOUD_API_ENDPOINT = "https://your-nextcloud.website/apps/bookmarks/public/rest/v2/"

BOOKMARKS_DB_HOST = 'localhost'
BOOKMARKS_DB_USER = 'root'
BOOKMARKS_DB_PASSWORD = ''
BOOKMARKS_DB_DB = 'bookmarks'


credentials = {
    "Authorization": b'Basic ' + base64.b64encode((NEXTCLOUD_USER + ":" + NEXTCLOUD_PASSWORD).encode())
}


connection = pymysql.connect(host=BOOKMARKS_DB_HOST,
                             user=BOOKMARKS_DB_USER,
                             password=BOOKMARKS_DB_PASSWORD,
                             db=BOOKMARKS_DB_DB,
                             charset='utf8mb4',
                             cursorclass=pymysql.cursors.DictCursor)

try:
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM box")
        boxes = cursor.fetchall()

        for box in boxes:
            print(box)

            # create folder:
            post_data = {
                "title": box['title'],
                "parent_folder": "-1"
            }
            req = urllib.request.Request(NEXTCLOUD_API_ENDPOINT + "folder", urllib.parse.urlencode(post_data).encode('ascii'), credentials)
            folder_id = None
            with urllib.request.urlopen(req) as f:
                response = f.read()
                data = json.loads(response.decode('utf-8'))
                print(data)
                folder_id = data['item']['id']


            cursor.execute("SELECT * FROM bookmark WHERE box_id = " + str(box['id']))
            bookmarks = cursor.fetchall()

            for bookmark in bookmarks:
                print(bookmark)

                # Create bookmark:
                post_data = {
                    "url": bookmark['link']
                }
                req = urllib.request.Request(NEXTCLOUD_API_ENDPOINT + "bookmark", urllib.parse.urlencode(post_data).encode('ascii'), credentials)
                bookmark_id = None
                with urllib.request.urlopen(req) as f:
                    response = f.read()
                    data = json.loads(response.decode('utf-8'))
                    print(data)
                    bookmark_id = data['item']['id']

                # Move bookmark to folder:
                req = urllib.request.Request(NEXTCLOUD_API_ENDPOINT + "folder/" + str(folder_id) + "/bookmarks/" + str(bookmark_id), headers=credentials, method='POST')
                with urllib.request.urlopen(req) as f:
                    response = f.read()
                    data = json.loads(response.decode('utf-8'))
                    print(data)

                # Delete bookmark from main folder:
                req = urllib.request.Request(NEXTCLOUD_API_ENDPOINT + "folder/-1/bookmarks/" + str(bookmark_id), headers=credentials, method='DELETE')
                with urllib.request.urlopen(req) as f:
                    response = f.read()
                    data = json.loads(response.decode('utf-8'))
                    print(data)
finally:
    connection.close()
