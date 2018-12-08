log_file = [
'rd_989e27e0c34a706353edd7ba9151ba7346e1f4ab.log'
]

import json
record = []
for file in log_file:
    with open(file, 'r') as f:
        record += [json.load(f)]

trace = [{} for i in log_file]
for u in range(len(log_file)):
    for i in range(len(record[u]['userRecords']['taskIds'])):
        trace[u][record[u]['userRecords']['taskIds'][i]] = \
                (record[u]['userRecords']['recordX'][i], record[u]['userRecords']['recordY'][i])

print(len(record[0]['userRecords']['taskIds']))
print(len(record[0]['userRecords']['recordX']))
print(len(record[0]['userRecords']['recordY']))
print(len(record[0]['userRecords']['timeUsed']))
print(trace[0].keys())

import matplotlib.pyplot as plt

# a path is indexed by a 4-tuple:
# (user, img, start, setting)
user = range(len(log_file))
img = range(6)
start = [(i, j) for j in range(2) for i in range(2)]
setting = ['Shake', 'Ctrl', 'None']

def get_task_name(img, i, j, setting):
    return str(img) + '-' + str(i) + '-' + str(j) + '-' + setting

import itertools
path_key = itertools.product(user, img, start, setting)
path = {k : trace[k[0]][get_task_name(k[1], *k[2], k[3])] for k in path_key}

print(path.keys())

def path_pred(user, img, start, setting):
    return start == (0, 1) and img in [1] and setting in ['Shake', 'None'] and user == 0


def plot_path(path_pred):
    for p in path.keys():
        if (path_pred(*p)):
            # print(path[p])
            plt.plot(*path[p])

plot_path(path_pred)

plt.xlim(-10, 1804)
plt.ylim(-10, 1203)
plt.show()