def repr(str):
    return "\"%s\"" % str


images = [
    "https://crispher.github.io/pages/s21.jpg",
    "https://crispher.github.io/pages/s22.png",
    "https://crispher.github.io/pages/s23.jpg",
    "https://crispher.github.io/pages/s24.jpg",
    "https://crispher.github.io/pages/s25.png",
    "https://crispher.github.io/pages/s26.jpg",
    "https://crispher.github.io/pages/s11.jpg"
]

n_images = len(images)
n_test_images = 2


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

def gen_rand_pos(i, j):
    while True:
        x = random.randint(15, 985) / 1000 + i
        y = random.randint(15, 985) / 1000 + j
        if (x - 1) ** 2 + (y - 1) ** 2 >= 0.5:
            break
    return (x * 0.5, y * 0.5)

start = [[[gen_rand_pos(i, j) for j in range(2)] 
        for i in range(2)]
        for img in range(n_images)]

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
        + repr("start") + ":" + ("{ x:%f, y:%f}"%start[image][posi][posj]) + ",\n"\
        + repr("target") + ":" + ("{x:%f, y:%f}"%target[image])\
        + "\n}\n"


ij_combinations = [(img, i, j) for img in range(n_test_images) for i in range(2) for j in range(2)]

random.shuffle(ij_combinations)
ij_shuffle1 = ij_combinations[:]
random.shuffle(ij_combinations)
ij_shuffle2 = ij_combinations[:]
random.shuffle(ij_combinations)
ij_shuffle3 = ij_combinations[:]

sample_task_instruction = "This is a sample task, you may move your mouse around. Remember to set page zoom\
 to 100% and run your brower in full screen mode. You should see the target at the certer of the screen."

taskA_var_script = "export const taskA = ["
taskA_var_script += new_task(n_images-1, 0, 0, 'None', sample_task_instruction + ' No pointer enhancement.')
taskA_var_script += ",\n"
for img, i, j in ij_shuffle1:
    taskA_var_script += new_task(img, i, j, 'None', "There is no cursor enhancement in this task")
    taskA_var_script += ",\n"
taskA_var_script += "]\n"


taskB_var_script = "export const taskB = ["
taskB_var_script += new_task(n_images-1, 0, 0, 'Ctrl', sample_task_instruction + ' Try pressing Ctrl.' )
taskB_var_script += ",\n"
for img, i, j in ij_shuffle2:
    taskB_var_script += new_task(img, i, j, 'Ctrl', "You may press Ctrl to magnify your cursor")
    taskB_var_script += ",\n"
taskB_var_script += "]\n"


taskC_var_script = "export const taskC = ["
taskC_var_script += new_task(n_images-1, 0, 0, 'Shake', sample_task_instruction + ' Try shaking your cursor.')
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