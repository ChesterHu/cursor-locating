<html>
    <body>
        <?php

$dir = 'log2';

// create new directory with 744 permissions if it does not exist yet
// owner will be the user/group the PHP script is run under
if ( !file_exists($dir) ) {
    mkdir ($dir, 0744);
}

        $requestBody = file_get_contents('php://input');
        $dec = json_decode($requestBody) or die ("could not decode json.");
        $dict = $dec->{'userInfo'};
        $filename = $dict->name;
        file_put_contents($dir . $filename . '.log', file_get_contents('php://input'));
        ?>
    </body>
</html>
