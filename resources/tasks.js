var img_path = './'

var tasks = [
    { 
        img : img_path + "1.jpg",
        // assume the browser is running in full-screen mode
        // start gives the relative position (x, y)
        start : [0.7, 0.9],
        // a rectangular region specified by the following coordinates
        // [x0, x1, y0, y1]
        target : [0.1, 0.12, 0.2, 0.22]
    }, 

    { img : img_path + "2.jpg", start : [0.30, 0.50], target : [0.20, 0.22, 0.90, 0.92] }, 
    { img : img_path + "3.jpg", start : [0.40, 0.80], target : [0.10, 0.12, 0.90, 0.92] }, 
    
]