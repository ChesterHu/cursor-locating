def repr(str):
    return "\"%s\"" % str


images = [
    "https://crispher.github.io/pages/s21.jpg",
    "https://crispher.github.io/pages/s22.png",
    "https://crispher.github.io/pages/s23.jpg",
    "https://crispher.github.io/pages/s24.jpg",
    "https://crispher.github.io/pages/s25.png",
    "https://crispher.github.io/pages/s26.jpg",
    "https://crispher.github.io/pages/black.jpg"
]

n_images = len(images)
n_test_images = 1


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


def new_task(image, posi, posj, setting, info, sample=False):
    sample_prefix = "sample-" if sample else ""
    return "{\n"\
        + repr("id") +":" + repr(sample_prefix + str(image)+"-"+str(posi)+"-"+str(posj)+"-"+setting)+",\n"\
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
taskA_var_script += new_task(n_images-1, 0, 0, 'None', 'This is a sample task. Please make sure you have set page zoom to 100%, and are running your browser in full screen mode. You should see the target right at the center of the screen.', sample=True)
taskA_var_script += ",\n"
for img, i, j in ij_shuffle1:
    taskA_var_script += new_task(img, i, j, 'None', "No techniques available in this task.")
    taskA_var_script += ",\n"
taskA_var_script += "]\n"


taskB_var_script = "export const taskB = ["
taskB_var_script += new_task(n_images-1, 0, 0, 'Ctrl', 'This is a sample task. Please make sure you have set page zoom to 100%, and are running your browser in full screen mode. You should see the target right at the center of the screen. On the next page, try pressing Ctrl.', sample=True)
taskB_var_script += ",\n"
for img, i, j in ij_shuffle2:
    taskB_var_script += new_task(img, i, j, 'Ctrl', "Press Ctrl to magnify your cursor.")
    taskB_var_script += ",\n"
taskB_var_script += "]\n"


taskC_var_script = "export const taskC = ["
taskC_var_script += new_task(n_images-1, 0, 0, 'Shake', 'This is a sample task. Please make sure you have set page zoom to 100%, and are running your browser in full screen mode. You should see the target right at the center of the screen. On the next page, try shaking your cursor.', sample=True)
taskC_var_script += ",\n"
for img, i, j in ij_shuffle3:
    taskC_var_script += new_task(img, i, j, 'Shake', "Shake your cursor to magnify it.")
    taskC_var_script += ",\n"
taskC_var_script += "]\n"


f = open("tasks_pygen_grouped_test.js", 'w')
f.write(images_var_script)
f.write(taskA_var_script)
f.write(taskB_var_script)
f.write(taskC_var_script)
f.write("export const tasks = [taskA, taskB, taskC]\n")
f.close()