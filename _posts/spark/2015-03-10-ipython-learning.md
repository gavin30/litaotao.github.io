---
layout: post
published: false
title: IPython 学习
description: 记录我学习、研究IPython的笔记。
---  

## 
## 1. 写在前面
　　最近一直在学习spark，延伸到学习IPython，发现IPython这东西还真是不一般啊，所以决定还是应该坐下了认真学习一下。下面都是我在官网上学习时的笔记了。

## 2. 前言
　　IPython provides a rich architecture for interactive computing with:

- Powerful interactive shells (terminal and Qt-based).
- A browser-based notebook with support for code, text, mathematical expressions, inline plots and other rich media.
- Support for interactive data visualization and use of GUI toolkits.
- Flexible, embeddable interpreters to load into your own projects.
- Easy to use, high performance tools for parallel computing.

　　IPython 3.x will be the last monolithic release of IPython, containing the notebook server, qtconsole, etc. The language-agnostic parts of the project: the notebook format, message protocol, qtconsole, notebook web application, etc. will move to new projects under the name Jupyter. IPython itself will return to being focused on interactive Python, part of which will be providing a Python kernel for Jupyter. 

## 3. 介绍
　　The goal of IPython is to create a comprehensive environment for interactive and exploratory computing. To support this goal, IPython has three main components:

- An enhanced interactive Python shell.
- A decoupled two-process communication model, which allows for multiple clients to connect to a computation kernel, most notably the web-based notebook
- An architecture for interactive parallel computing.

### 3.1 Enhanced interactive Python shell
　　看官网。[link](http://ipython.org/ipython-doc/stable/overview.html#ipythonzmq)

### 3.2 Decoupled two-process model
　　IPython has abstracted and extended the notion of a traditional Read-Evaluate-Print Loop (REPL) environment by decoupling the evaluation into its own process. We call this process a kernel: it receives execution instructions from clients and communicates the results back to them.

　　This decoupling allows us to have several clients connected to the same kernel, and even allows clients and kernels to live on different machines. With the exclusion of the traditional single process terminal-based IPython (what you start if you run ipython without any subcommands), all other IPython machinery uses this two-process model. This includes ipython console, ipython qtconsole, and ipython notebook.

　　As an example, this means that when you start ipython qtconsole, you’re really starting two processes, a kernel and a Qt-based client can send commands to and receive results from that kernel. If there is already a kernel running that you want to connect to, you can pass the --existing flag which will skip initiating a new kernel and connect to the most recent kernel, instead. To connect to a specific kernel once you have several kernels running, use the %connect_info magic to get the unique connection file, which will be something like --existing kernel-19732.json but with different numbers which correspond to the Process ID of the kernel.

　　You can read more about using ipython qtconsole, and ipython notebook. There is also a message spec which documents the protocol for communication between kernels and clients.

　　zeppelin也是用了这样的机制的，看来databricks也是这样搞的。关于这个机制，这篇notebook有简单的[描述](http://nbviewer.ipython.org/github/ipython/ipython/blob/1.x/examples/notebooks/Frontend-Kernel%20Model.ipynb)

### 3.3 Interactive parallel computing
　　看官网。

## 4. 安装
　　还是看[官网](../http://ipython.org/ipython-doc/stable/install/install.html)有用，主要还是要解决依赖的问题，最好的方法就是 pip install "ipython[all]"。

## 5. Using IPython for interactive work

### 5.1 Introducing IPython
　　常用的四个帮助方法：

- ? ：  Introduction and overview of IPython’s features.
- %quickref ：  Quick reference.
- help ：   Python’s own help system.
- object? ： Details about ‘object’, use ‘object??’ for extra details.

　　Typing object_name? will print all sorts of details about any object, including docstrings, function definition lines (for call arguments) and constructor details for classes. To get specific information on an object, you can use the magic commands %pdoc, %pdef, %psource and %pfile










# . 学习资源

- [官网](http://ipython.org/)