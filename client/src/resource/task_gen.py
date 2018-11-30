def repr(str):
    return "\"%s\"" % str


images = [
    "https://crispher.github.io/pages/s1.jpg",
    "https://crispher.github.io/pages/s2.jpg",
    "https://crispher.github.io/pages/s3.jpg",
    "https://crispher.github.io/pages/s4.jpg",
    "https://crispher.github.io/pages/s5.jpg",
    "https://wallpaperbrowse.com/media/images/background-2076336_960_720.jpg"
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
        (random.randint(2, 998) / 1000 + i) * 0.25, 
        (random.randint(2, 998) / 1000 + j) * 0.25
    ) for j in range(4)]
    for i in range(4)
]

target = [
    (0.4, 0.5),
    (0.5, 0.5),
    (0.5, 0.4),
    (0.5, 0.6),
    (0.6, 0.5),
    (0.5, 0.5)
]

'''
task = {
    "id" : "t1",
    "image" : 0,
    "info" : "string",
    "setting" : ['None', 'Ctrl', 'Shake'],
    "start" : { x : 0.3, y : 0.6 },
    "target" : { x : 0.4, y: 0.7, }
}
'''


def new_task(image, posi, posj, setting, info):
    return "{\n"\
        + repr("id") +":" + repr(str(image)+"-"+str(posi)+"-"+str(posj)+"-"+setting)+",\n"\
        + repr("image") + ":" + str(image) + ",\n"\
        + repr("info") + ":" + repr(info) + ",\n"\
        + repr("setting") + ":" + repr(setting) + ",\n"\
        + repr("start") + ":" + ("{ x:%f, y:%f}"%start[posi][posj]) + ",\n"\
        + repr("target") + ":" + ("{x:%f, y:%f}"%target[image])\
        + "\n}\n"

print(new_task(0, 1, 3, "None", "hello"))

ij_combinations = [(img, i, j) for img in range(5) for i in range(4) for j in range(4)]
print(ij_combinations)

random.shuffle(ij_combinations)
ij_shuffle1 = ij_combinations[:]
random.shuffle(ij_combinations)
ij_shuffle2 = ij_combinations[:]
random.shuffle(ij_combinations)
ij_shuffle3 = ij_combinations[:]

task_var_script = "export const tasks = ["

task_var_script += new_task(5, 0, 0, 'None', "This is a sample task, you may move your mouse around")
task_var_script += ",\n"
for img, i, j in ij_shuffle1:
    task_var_script += new_task(img, i, j, 'None', "There is no cursor enhancement in this task")
    task_var_script += ",\n"

task_var_script += new_task(5, 0, 0, 'Ctrl', "This is a sample task, you may move your mouse around")
task_var_script += ",\n"
for img, i, j in ij_shuffle2:
    task_var_script += new_task(img, i, j, 'Ctrl', "You may press Ctrl to magnify your cursor")
    task_var_script += ",\n"

task_var_script += new_task(5, 0, 0, 'Shake', "This is a sample task, you may move your mouse around")
task_var_script += ",\n"
for img, i, j in ij_shuffle3:
    task_var_script += new_task(img, i, j, 'Shake', "When you shake your cursor, it is magnified")
    task_var_script += ",\n"
task_var_script += "]\n"


f = open("tasks_pygen.js", 'w')
f.write(images_var_script)
f.write(task_var_script)
f.close()