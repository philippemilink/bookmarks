app.filter('html_decode', function() {
    return function(input, scope) {
        return input.replace('&amp;', '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&#039;/g, "'");
    }
})
