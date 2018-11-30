<html>
    <body>
        <?php
        $requestBody = file_get_contents('php://input');
        $dec = json_decode($requestBody) or die ("could not decode json.");
        $dict = $dec->{'userInfo'};
        $filename = $dict->name;
        file_put_contents('log/' . $filename . '.log', file_get_contents('php://input'));
        ?>
    </body>
</html>
