import glob
log_file = glob.glob('rd*.log')
print('%d files loaded'% len(log_file))

import numpy as np
import matplotlib.pyplot as plt

import json
record = []
for file in log_file:
    with open(file, 'r') as f:
        record += [json.load(f)]

trace = [{} for i in log_file]
time = [{} for i in log_file]
triggered = [{} for i in log_file]
score_ctrl = []
score_shake = []

for u in range(len(log_file)):
    resX, resY = record[u]['userRecords']['screenWidth'], record[u]['userRecords']['screenHeight']
    for i in range(len(record[u]['userRecords']['taskIds'])):
        trace[u][record[u]['userRecords']['taskIds'][i]] = \
                (np.array(record[u]['userRecords']['recordX'][i]) / resX, np.array(record[u]['userRecords']['recordY'][i]) / resY)
        time[u][record[u]['userRecords']['taskIds'][i]] = \
                (record[u]['userRecords']['timeUsed'][i])
        triggered[u][record[u]['userRecords']['taskIds'][i]] = \
                (record[u]['userRecords']['triggerRecord'][i])
    score_ctrl += [int(record[u]['userInfo']['scoreCtrl'])]
    score_shake += [int(record[u]['userInfo']['scoreShake'])]

print(score_ctrl, np.mean(score_ctrl), np.std(score_ctrl))
print(score_shake, np.mean(score_shake), np.std(score_shake))

def user_rate_plot():
    plt.hist(score_ctrl, np.array([0.5, 1.5, 2.5, 3.5, 4.5, 5.5])-0.2, rwidth=0.4, label='Ctrl')
    plt.hist(score_shake, np.array([0.5, 1.5, 2.5, 3.5, 4.5, 5.5])+0.2, rwidth=0.4, label='Shake')
    plt.legend()
    plt.title('Do users think Ctrl/Shake helped them find the pointer faster?')
    plt.xlabel('Rating: 1 (strongly disagree) - 5 (strongly agree)')
    plt.ylabel('Number of participants')
    plt.show()

ctrl_tasks = ["3-0-1-Ctrl","0-0-0-Ctrl","5-1-1-Ctrl","4-1-0-Ctrl","4-0-1-Ctrl","0-0-1-Ctrl","2-1-0-Ctrl","5-0-0-Ctrl","2-0-1-Ctrl","4-1-1-Ctrl","3-1-0-Ctrl","0-1-1-Ctrl","3-0-0-Ctrl","5-0-1-Ctrl","1-1-1-Ctrl","0-1-0-Ctrl","2-0-0-Ctrl","3-1-1-Ctrl","2-1-1-Ctrl","4-0-0-Ctrl","1-1-0-Ctrl","5-1-0-Ctrl","1-0-1-Ctrl","1-0-0-Ctrl"]
shake_tasks = ["4-0-1-Shake","0-1-0-Shake","5-1-1-Shake","5-0-0-Shake","1-0-1-Shake","0-0-0-Shake","1-1-0-Shake","2-1-1-Shake","1-0-0-Shake","2-1-0-Shake","0-1-1-Shake","5-0-1-Shake","3-1-1-Shake","4-0-0-Shake","0-0-1-Shake","2-0-1-Shake","3-0-0-Shake","4-1-1-Shake","2-0-0-Shake","3-0-1-Shake","4-1-0-Shake","3-1-0-Shake","5-1-0-Shake","1-1-1-Shake"]
none_tasks = ["4-0-0-None","5-0-1-None","2-1-1-None","3-0-0-None","3-1-1-None","3-1-0-None","5-1-0-None","0-1-1-None","4-1-0-None","2-0-1-None","4-1-1-None","1-1-0-None","0-0-0-None","4-0-1-None","1-0-1-None","1-1-1-None","3-0-1-None","5-1-1-None","1-0-0-None","2-0-0-None","2-1-0-None","0-1-0-None","0-0-1-None","5-0-0-None"]
def get_key(task_id):
    return int(task_id[0]), (int(task_id[2]), int(task_id[4])), task_id[6:]

ctrl_tasks = [get_key(t) for t in ctrl_tasks]
shake_tasks = [get_key(t) for t in shake_tasks]
none_tasks = [get_key(t) for t in none_tasks]


# a path is indexed by a 4-tuple:
# (user, img, start, setting)
user = range(len(log_file))
img = range(6)
start = [(i, j) for j in range(2) for i in range(2)]
setting = ['Shake', 'Ctrl', 'None']

def get_task_name(img, i, j, setting):
    return str(img) + '-' + str(i) + '-' + str(j) + '-' + setting

import itertools
task_key = list(itertools.product(user, img, start, setting))

path = {k : trace[k[0]][get_task_name(k[1], *k[2], k[3])] for k in task_key}
time = {k : time[k[0]][get_task_name(k[1], *k[2], k[3])] for k in task_key}
triggered = {k : triggered[k[0]][get_task_name(k[1], *k[2], k[3])] for k in task_key}

print({k : v for k, v in triggered.items() if ctrl_tasks[0] == k[1:] and v == True})
trigger_ctrl = [len({k : v for k, v in triggered.items() if ctrl_tasks[i] == k[1:] and v == True})
    for i in range(24)]
trigger_shake = [len({k : v for k, v in triggered.items() if shake_tasks[i] == k[1:] and v == True})
    for i in range(24)]


def trigger_plot():
    print(trigger_ctrl, np.sum(trigger_ctrl)/24/12)
    print(trigger_shake, np.sum(trigger_shake)/24/12)
    plt.plot(np.array(trigger_ctrl)/12, label='Ctrl')
    plt.plot(np.array(trigger_shake)/12, label='Shake')
    plt.ylim(0, 1.1)
    plt.title('Percentage of triggering in tasks')
    plt.legend()
    plt.xlabel('i-th task')
    plt.ylabel('Percentage of times triggered')
    plt.show()
# trigger_plot()


def task_pred(user, img, start, setting):
    return  img in [1] and setting in ['None'] and user < 3

def get_distance(x, y):
    l = np.sqrt(np.square(x[1:] - x[:-1]) + np.square(y[1:]-y[:-1]))
    l = np.add.accumulate(l)
    d = np.sqrt((x[-1]-x[0])**2+(y[-1]-y[0])**2)
    return l[-1] / d


def plot_path(path_pred):
    for p in path.keys():
        if (path_pred(*p)):
            plt.plot(*path[p], ':')
'''
plot_path(task_pred)

plt.xlim(-0.1, 1.1)
plt.ylim(-0.1, 1.1)
plt.show()
'''

def csv_write():
    with open('time.csv', 'w') as f:
        for k, v in time.items():
            f.write('%d,%d,%d,%s,%f\n' % (k[0], k[1], k[2][0] * 2 + k[2][1], k[3], v))


    with open('distance.csv', 'w') as f:
        for k, v in path.items():
            f.write('%d,%d,%d,%s,%f\n' % (k[0], k[1], k[2][0] * 2 + k[2][1], k[3], get_distance(*v)))

import matplotlib


def plot_seq(task_pred):
    pp = [v for k, v in path.items() if task_pred(*k)]
    c = ['b', 'g', 'r', 'c', 'm', 'y', 'k', 'w']
    i = 0
    while (True):
        cont = False
        plt.gcf().clear()
        fig = plt.figure()
        ax = fig.add_subplot(111)
        ax.set_aspect(2/3)
        ax.set_yticklabels([])
        ax.set_xticklabels([])

        matplotlib.rcParams['savefig.dpi'] = 600
        for pi, p in enumerate(pp):
            if i < len(p[0]):
                l = i 
                cont = True
            else:
                l = len(p[0]) - 1
            cl = c[pi % 7]
            # plt.plot(p[0][:l], p[1][:l], cl+':', p[0][l], p[1][l], cl+'.', linewidth=0.5)
            ax.plot(p[0][:l], p[1][:l], cl+':', p[0][l], p[1][l], cl+'.', linewidth=0.6)
        plt.xlim(-0.05, 1.05)
        plt.ylim(-0.05, 1.05)
        # plt.savefig('animation/%d.png' % i)
        fig.savefig('Ctrl/%d.png' % i)
        plt.close()
        if not cont:
            return
        i = i + 1

def task_pred(user, img, start, setting):
    return  img in [1] and setting in ['Ctrl'] and start == (0, 1)

plot_seq(task_pred)