var img_path = '../resource/img/'
import img1 from './img/1.jpg';
import img2 from './img/2.jpg';
import img3 from './img/3.jpg';

export const technique_settings = [
    {
        env_id : "e1",
        trigger : "none",
        visual_effect : "none",
    },

    {
        env_id : "e2",
        trigger : "shake",
        visual_effect : "enlarge",
    },

    {
        env_id : "e3",
        trigger : "ctrl", 
        visual_effect : "enlarge",
    },

    {
        env_id : "e4",
        trigger : "shake",
        visual_effect : "sonar",
    },

    {
        env_id : "e5",
        trigger : "ctrl",
        visual_effect : "sonar",
    }
]

export const tasks = [
    { 
        task_id : "t1",
        img : img1,
        // assume the browser is running in full-screen mode
        // start gives the relative position (x, y)
        start : [0.7, 0.9],
        // a rectangular region specified by the following coordinates
        // [x0, x1, y0, y1]
			target: {
				top: '100px',
				left: '200px',
			}
    }, 

	{ 
		task_id : "t2", 
		img : img2, 
		start : [0.30, 0.50], 
		target: {
			top: '200px',
			left: '400px'
		}
	}, 
	{ 
		task_id : "t3", 
		img : img3, 
		start : [0.40, 0.80], 
		target: {
			top: '120px',
			left: '240px'
		}
	}, 
    
]

export const questionnaire = [
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
