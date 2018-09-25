document.addEventListener('DOMContentLoaded', function() {

    var button = document.getElementById('userButton');
    button.addEventListener('click', function () {
        var itemCopy = document.getElementById('contCopy');
        var range = document.createRange();
        range.selectNode(itemCopy);
        window.getSelection().addRange(range);

        try {
            document.execCommand('copy');
        } catch(err) {
            console.log('Can`t copy.');
        }

        window.getSelection().removeAllRanges();
    });
});
