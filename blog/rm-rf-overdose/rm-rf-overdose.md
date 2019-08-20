---
path: "/blog/rm-rf-overdose"
date: "2019-08-04"
title: "rm -rf overdose"
summary: "When a tiny error makes you lose time and money"
---

The `rm` command on Unix and the `-rf` flags are like bread and butter. At least for me, it's hard to imagine running the `rm` command without those flags. As a matter of fact, it became like an instinct and almost as if the command was always `rm -rf`.

If you know what you are doing, you can be safe running the full command like that all the time, but I should know myself better and recognize that it is going to be way better for me to think twice before hitting the Enter key. Let me tell you about what happened to me a few weeks ago when I lost a whole day of progress on a project running on a **Google Compute Cloud** instance for which I was paying **1.5 USD** an hour. Essentially, running an `rm -rf` command without giving it second thoughts made me lose around 15 USD. Which is not a lot of money compared to [what happened to Pixar for running this exact same command](https://www.theverge.com/2012/5/14/3019871/watch-this-toy-story-2-bad-backup) a few years ago.

## An introduction to `rm`
The way I usually used `rm -rf` is extremely simple:
```bash
rm -rf directory_to_delete/
```

I just specified the path to the directory I wanted to remove recursively and I'm done! Great 💯💯💯. To gain more context let's break the command step by step:

- `rm`: As its own manual (for the BSD version) says:

> The **rm** utility attempts to remove the non-directory type files specified on the command line. If the permissions of the file do not permit writing, and the standard input device is a terminal, the user is prompted (on the standard error output) for confirmation.

So there you go, the basic command to remove files in Unix.

- `-r`: Recursively remove directories. Remember how `rm` attempts to remove non-directory type files? Well, with this flag it will remove directories (and their contents).

- `-f`: **Never prompt for confirmation**, even if the file that it's attempting to delete do not permit writing.

## Don't try this at `/home`

Let's set up a test environment to show you the silly mistake I made the other day. I will spin up an Ubuntu container using **Docker**, but if you like you could use any Virtual Machine, Cloud Instance, a disk partition of your old laptop with a Linux distro you use for experiments, anything you like. Just avoid playing with `rm` on your main machine, especially near your important files, please 🙏.

I'll start by running an interactive Ubuntu session with docker and creating a basic file structure:

```bash
$ docker run -it --rm ubuntu
root@ubuntu:/# cd home/
root@ubuntu:/home# mkdir my-files
root@ubuntu:/home# cd my-files
root@ubuntu:/home/my-files# mkdir pictures
root@ubuntu:/home/my-files# mkdir music
root@ubuntu:/home/my-files# mkdir code
root@ubuntu:/home/my-files# mkdir docs
root@ubuntu:/home/my-files# cd docs
root@ubuntu:/home/my-files/docs# mkdir pdfs
root@ubuntu:/home/my-files/docs# mkdir business
root@ubuntu:/home/my-files/docs# mkdir tmp
```

OK, so far we are just creating a bunch of directories. The structure is as follows:
```
|- my-files
|   |- pictures
|   |- music
|   |- code
|   |- docs
|   |   |- pdfs
|   |   |- business
|   |   |- tmp
```

Now imagine that we would like to get rid of the `tmp` directory under the `/docs` directory (funnily enough, this was actually what I was trying to do!), we can achieve this by doing:

```bash
rm -rf /home/my-files/docs/tmp 
```

We could also do it using relative paths, so for instance, if our current working directory is `/home/my-files/docs` we could do instead `rm -rf tmp/`.

Now, here comes what I did wrong the time I was trying to delete my `tmp` directory:

```bash
rm -rf /home/my-files/docs/tmp\
```

Can you spot the difference with the original command? It's just a character! Right before I pressed the Enter key I accidentally pressed the key right above it in my Macbook keyboard, the backslash character `\`. What's so special about the backslash character on a bash command? It escapes the next character to avoid it to be interpreted by the shell. So in my case when I pressed the Enter key my `rm` command didn't run yet.

Hmm. That could be potentially good, right? Actually, yes! That little mistake can give you one more chance to review that the line you've written is correct and if you spot any typo, disregard it before doing any damage 🙂. The problem is that, if you happen to not be paying enough attention (which was definitely my case), you could end up not realizing that your `rm` command didn't run yet and move to the next command as if everything went smoothly. And what happens if the next command you run is a `cd` (change directory)? 🤔 let's go ahead and try it:

```bash
root@ubuntu:/# rm -rf /home/my-files/docs/tmp\
> cd /home/my-files
```

Run it and... all of our folders are gone 😱

## Wh...what happened?

Remember how we said that the `\` made the shell ignore the next character? Well... That means that our previous command is equivalent to this:

```bash
rm -rf /home/my-files/docs/tmpcd /home/my-files
```

I didn't know that `rm` could be used to remove multiple directories at the same time, but it turns out it is possible. So here we are trying to delete two directories: `/home/my-files/docs/tmpcd` (which doesn't exist since the `cd` suffix shouldn't be there) and... `/home/my-files` 😱😱😱😱. So, even if I originally was extremely confident about running `rm -rf /home/my-files/docs/tmp` since of course I wanted to remove that directory and thus the `-f` flag wouldn't be a problem, I wasn't aware that the shell didn't run the command yet, so the `cd /home/my-files` of the next line wasn't interpreted as a change directory command.

## What can I do to prevent this?

First of all, have frequent backups and test recover from them from time to time. If possible, make sure to have more than one physical copy of your files and also store what you can in a secure cloud. Mistakes, accidents, and disk issues happen and you never know when.

If your platform is running the [GNU version of rm](http://man7.org/linux/man-pages/man1/rm.1.html) you can use the `-I` *(uppercase i)* flag instead of `-f` and you will receive a prompt before the actual execution of the destructive action (unless you are trying to remove less than 4 files and not recursively). It's similar to `-i` *(lowercase i)* but far less annoying and is perfect for the situation described in this post.

Let's see it in action:

```bash
root@ubuntu:/# rm -rI /home/my-files/docs/tmp\
> cd /home/my-files
rm: remove 2 arguments recursively?
```

If we were using the `-I` flag, we would be surprised to see the `rm` confirmation prompt after what we thought was a `cd` command. It gives us much higher chances of catching this kind of errors and in general, it gives us one more chance of thinking about what we are about to do.

BUT... it's not available by default on macOS ☹️. The thing is that the `rm` implementation found on macOS is the BSD one, that doesn't support the `-I` flag. If you use [homebrew](https://formulae.brew.sh/formula/coreutils) you can install `rm` (and many other GNU coreutils) with `brew install coreutils` and the GNU `rm` version will be available as `grm`. You can then **alias** it to `rm` if you'd like.

If you would rather keep the native implementation of `rm` I would suggest using the [Z shell](https://en.wikipedia.org/wiki/Z_shell) as a shell with the [oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh) framework installed. There, you can find many [amazing themes](https://github.com/robbyrussell/oh-my-zsh/wiki/Themes) to customize your shell with different backgrounds, icons and what's important for avoiding the mistake that concerns us the most in this post: the **prompt**.

I personally use the [agnoster](https://github.com/agnoster/agnoster-zsh-theme) theme, and it gives you a really distinctive prompt that makes it far easier to me to identify when I'm continuing the same command of the previous line or if I'm actually in a new line.

![Screenshot of the example rm -rf command of this post with the zsh "agnoster" theme](./rm-agnoster.png)

In the screenshot, there is a main prompt filled with blue with the current working directory and an undecorated prompt with a `>` sign indicating that we are continuing the line before.

As a third option, you could try to use external CLI tools that instead of removing the files, move them to the trash bin instead. One of the most popular is [trash-cli](https://github.com/sindresorhus/trash-cli) that is available for macOS, Linux, and Windows. The author of that tool, Sindre Sorhus, also wrote [a guide with other tricks to avoid accidents with `rm`](https://github.com/sindresorhus/guides/blob/master/how-not-to-rm-yourself.md#how-not-to-rm-yourself).

I hope this post gives you more options for the next time you are tempted to use `rm -rf` and remember to be careful out there!