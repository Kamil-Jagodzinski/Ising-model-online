import matplotlib.pyplot as plt
import numpy as np
from scipy import stats
import seaborn as sns
from scipy.stats import gaussian_kde
import pandas as pd
import os


def temp_to_sus():
    f = open(os.path.expanduser("output/magneticSusceptibility.txt"))
    lines = f.readlines()

    x, y = [], []

    for line in lines:
        x.append(line.split()[0])
        y.append(line.split()[1])

    x_int = [float(q) for q in x]
    y_int = [float(q) for q in y]

    f.close()
    plt.xlabel("Temperature (T)", fontsize=20)
    plt.ylabel("Susceptibility ", fontsize=20)
    plt.plot(x_int, y_int, marker="o", linestyle="--")
    plt.savefig("charts/temp_to_sus.png")
    plt.clf()


def temp_to_sh():
    f = open(os.path.expanduser("output/specifiHeat.txt"))
    lines = f.readlines()

    x, y = [], []

    for line in lines:
        x.append(line.split()[0])
        y.append(line.split()[1])

    x_int = [float(q) for q in x]
    y_int = [float(q) for q in y]

    # plt.xticks(xi, x)

    # plt.scatter(x_int, y_int, s=50, marker="o", color="IndianRed")
    plt.xlabel("Temperature", fontsize=20)
    plt.ylabel("Specific Heat ", fontsize=20)
    plt.plot(x_int, y_int, marker="o", linestyle="--")
    plt.savefig("charts/temp_to_sh.png")
    f.close()
    plt.clf()


def temp_to_mag():
    mag_file = open(os.path.expanduser("output/magnetization.txt"))
    lines = mag_file.readlines()

    x, y = [], []

    for line in lines:
        x.append(line.split()[0])
        y.append(line.split()[1])

    x_int = [float(q) for q in x]
    y_int = [abs(float(q)) for q in y]

    # plt.xticks(x_int, rotation=315)

    plt.xlabel("Temperature (T)", fontsize=20)
    plt.ylabel("Magnetization ", fontsize=20)
    plt.plot(x_int, y_int, marker="o", linestyle="--")
    plt.savefig("charts/temp_to_mag.png")
    mag_file.close()
    plt.clf()


def temp_to_energy():
    energy_file = open(os.path.expanduser("output/energy.txt"))
    lines = energy_file.readlines()

    x, y = [], []

    for line in lines:
        x.append(line.split()[0])
        y.append(line.split()[1])

    x_int = [float(q) for q in x]
    y_int = [float(q) for q in y]

    plt.xlabel("Temperature (T)", fontsize=20)
    plt.ylabel("Energy ", fontsize=20)
    plt.plot(x_int, y_int, marker="o", linestyle="--")
    plt.savefig("charts/temp_to_energy.png")
    energy_file.close()
    plt.clf()


def plot_config():
    with open("output/spins.txt") as f:
        lines = sum(1 for each_line in f)
    N = 64
    y = 1 + int((lines / np.ceil(np.sqrt(lines))))
    x = 1 + int(lines / y)
    with open("output/spins.txt") as f:
        for index in range(lines):
            line = f.readline()
            twdim = [line[i : i + N] for i in range(0, len(line) - 1, N)]
            # print(twdim)
            arr = np.array(twdim)
            # print(list(arr[0]))
            config = [list(map(int, arr[i])) for i in range(0, len(arr))]
            # print(config)
            X, Y = np.meshgrid(range(N), range(N))
            # print('x=', x, '\ny=', y, '\nindex=', 1+index)
            plt.subplot(x, y, 1 + index)
            plt.pcolormesh(X, Y, np.array(config), cmap=plt.cm.RdBu)
            # plt.title("Time=%d" % i)
            plt.axis("tight")
    plt.savefig("charts/config.png")


if __name__ == "__main__":

    plot_config()
    temp_to_energy()
    temp_to_mag()
    temp_to_sh()
    temp_to_sus()
