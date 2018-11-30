def repr(str):
    return "\"%s\"" % str


images = [
    "https://crispher.github.io/pages/s11.jpg",
    "https://crispher.github.io/pages/s12.jpg",
    "https://crispher.github.io/pages/s13.jpg",
    "https://crispher.github.io/pages/s14.jpg",
    "https://crispher.github.io/pages/s15.jpg",
    "https://crispher.github.io/pages/s16.jpg",
    "https://crispher.github.io/pages/s17.jpg"
]

images_var_script = "export const images = [\n"
for img in images:
    images_var_script += repr(img) + ",\n"
images_var_script += "]\n"

settings = [
    'None',
    'Ctrl',
    'Shake'
]
import random
start = [
    [(
        (random.randint(15, 985) / 1000 + i) * 0.5, 
        (random.randint(15, 985) / 1000 + j) * 0.5
    ) for j in range(2)]
    for i in range(2)
]

target = [
    (0.4, 0.5),
    (0.5, 0.5),
    (0.5, 0.4),
    (0.5, 0.6),
    (0.6, 0.5),
    (0.5, 0.5),
    (0.5, 0.5)
]



def new_task(image, posi, posj, setting, info):
    return "{\n"\
        + repr("id") +":" + repr(str(image)+"-"+str(posi)+"-"+str(posj)+"-"+setting)+",\n"\
        + repr("image") + ":" + str(image) + ",\n"\
        + repr("info") + ":" + repr(info) + ",\n"\
        + repr("setting") + ":" + repr(setting) + ",\n"\
        + repr("start") + ":" + ("{ x:%f, y:%f}"%start[posi][posj]) + ",\n"\
        + repr("target") + ":" + ("{x:%f, y:%f}"%target[image])\
        + "\n}\n"


ij_combinations = [(img, i, j) for img in range(6) for i in range(2) for j in range(2)]

random.shuffle(ij_combinations)
ij_shuffle1 = ij_combinations[:]
random.shuffle(ij_combinations)
ij_shuffle2 = ij_combinations[:]
random.shuffle(ij_combinations)
ij_shuffle3 = ij_combinations[:]

sample_task_instruction = "This is a sample task, you may move your mouse around. Remember to set page zoom\
 to 100%% and run your brower in full screen mode. You should see the target at the certer of the screen."

taskA_var_script = "export const taskA = ["
taskA_var_script += new_task(6, 0, 0, 'None', sample_task_instruction + ' No pointer enhancement.')
taskA_var_script += ",\n"
for img, i, j in ij_shuffle1:
    taskA_var_script += new_task(img, i, j, 'None', "There is no cursor enhancement in this task")
    taskA_var_script += ",\n"
taskA_var_script += "]\n"


taskB_var_script = "export const taskB = ["
taskB_var_script += new_task(6, 0, 0, 'Ctrl', sample_task_instruction + ' Try pressing Ctrl.' )
taskB_var_script += ",\n"
for img, i, j in ij_shuffle2:
    taskB_var_script += new_task(img, i, j, 'Ctrl', "You may press Ctrl to magnify your cursor")
    taskB_var_script += ",\n"
taskB_var_script += "]\n"


taskC_var_script = "export const taskC = ["
taskC_var_script += new_task(6, 0, 0, 'Shake', sample_task_instruction + ' Try shaking your cursor.')
taskC_var_script += ",\n"
for img, i, j in ij_shuffle3:
    taskC_var_script += new_task(img, i, j, 'Shake', "When you shake your cursor, it is magnified")
    taskC_var_script += ",\n"
taskC_var_script += "]\n"


f = open("tasks_pygen_grouped.js", 'w')
f.write(images_var_script)
f.write(taskA_var_script)
f.write(taskB_var_script)
f.write(taskC_var_script)
f.write("export const tasks = [taskA, taskB, taskC]\n")
f.close()