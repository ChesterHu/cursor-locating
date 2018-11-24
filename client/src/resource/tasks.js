var img_path = './'

var technique_settings = [
    {
        env_id = "e1",
        trigger : "none",
        visual_effect : "none",
    },

    {
        env_id = "e2",
        trigger : "shake",
        visual_effect : "enlarge",
    },

    {
        env_id = "e3",
        trigger : "ctrl", 
        visual_effect : "enlarge",
    },

    {
        env_id = "e4",
        trigger : "shake",
        visual_effect : "sonar",
    },

    {
        env_id = "e5",
        trigger : "ctrl",
        visual_effect : "sonar",
    }
]

var tasks = [
    { 
        task_id : "t1",
        img : img_path + "1.jpg",
        // assume the browser is running in full-screen mode
        // start gives the relative position (x, y)
        start : [0.7, 0.9],
        // a rectangular region specified by the following coordinates
        // [x0, x1, y0, y1]
        target : [0.1, 0.12, 0.2, 0.22]
    }, 

    { task_id : "t2", img : img_path + "2.jpg", start : [0.30, 0.50], target : [0.20, 0.22, 0.90, 0.92] }, 
    { task_id : "t3", img : img_path + "3.jpg", start : [0.40, 0.80], target : [0.10, 0.12, 0.90, 0.92] }, 
    
]

var questionnaire = [
    { 
        question_id : "q1",
        question : "What pointing device are you using?",
        type : "multiple_choice",
        options : ["Mouse", "Touchpad"],
    },

    {
        question_id : "q2",
        question : "Please enter your name:",
        type : "fill_in_the_blank",
    },
]

// collect data r as a dict:
// r[question_id] = answer to that question
// r[task_id] = [[x0, y0], [x1, y1], ...], pointer position sampled every 20ms.
// x, y are positions relative screen size.