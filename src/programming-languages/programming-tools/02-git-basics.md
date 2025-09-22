# Git基础教程

Git是一个开源的分布式版本控制系统，它可以有效地管理各种规模的项目代码。Git由Linus Torvalds在2005年为了管理Linux内核开发而创建，现已成为世界上最流行的版本控制系统之一。

## 一、Git概述

### 1.1 什么是Git？

Git是一个分布式版本控制系统，它允许你跟踪文件的变化、协调多人之间的工作、恢复旧版本的文件，以及管理项目的不同分支。与集中式版本控制系统不同，Git不需要中央服务器来存储所有文件的历史记录，每个开发者都拥有完整的代码库副本。

### 1.2 Git的特点

- **分布式**：每个开发者都有完整的代码库副本，包括所有历史记录
- **高效**：Git的设计注重性能，即使是大型项目也能快速操作
- **分支管理**：Git的分支功能强大且轻量，便于实验和协作
- **完整性**：Git使用SHA-1哈希算法确保数据的完整性和一致性
- **安全**：Git具有多种机制来防止数据丢失和损坏

## 二、Git安装

### 2.1 Windows安装

1. 访问[Git官方网站](https://git-scm.com/download/win)下载Windows安装程序
2. 运行安装程序，按照默认设置或根据需要自定义安装选项
3. 完成安装后，可以在Git Bash或命令提示符中使用`git --version`验证安装

### 2.2 Linux安装

在大多数Linux发行版中，可以使用包管理器安装Git：

#### Ubuntu/Debian
```bash
sudo apt-get update
sudo apt-get install git
```

#### CentOS/RHEL
```bash
sudo yum install git
# 或者在CentOS 8及以上版本
# sudo dnf install git
```

#### Arch Linux
```bash
sudo pacman -S git
```

### 2.3 macOS安装

可以使用Homebrew安装Git：

```bash
brew install git
```

也可以从官方网站下载安装包，或者使用Xcode Command Line Tools：

```bash
xcode-select --install
```

## 三、Git基础配置

### 3.1 设置用户信息

安装完成后，首先需要设置你的用户名和邮箱地址，这些信息会出现在你的提交记录中：

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### 3.2 配置默认编辑器

设置Git使用的默认文本编辑器：

```bash
# 使用VS Code
git config --global core.editor "code --wait"

# 使用Vim
git config --global core.editor "vim"

# 使用Notepad++ (Windows)
git config --global core.editor "'C:/Program Files/Notepad++/notepad++.exe' -multiInst -notabbar -nosession -noPlugin"
```

### 3.3 查看配置信息

查看当前的Git配置：

```bash
git config --list
```

查看特定配置项：

```bash
git config user.name
git config user.email
```

## 四、Git基础命令

### 4.1 创建和克隆仓库

#### 创建新仓库

在现有目录中初始化Git仓库：

```bash
cd /path/to/project
git init
```

#### 克隆现有仓库

克隆远程仓库到本地：

```bash
git clone https://github.com/username/repository.git
```

克隆到指定目录：

```bash
git clone https://github.com/username/repository.git my-directory
```

### 4.2 工作流基础命令

#### 检查状态

查看当前工作目录的状态：

```bash
git status
```

#### 跟踪文件

将未跟踪的文件添加到暂存区：

```bash
git add filename.txt
```

添加所有文件：

```bash
git add .
# 或
git add -A
```

#### 提交更改

将暂存区的更改提交到本地仓库：

```bash
git commit -m "Commit message"
```

修改最后一次提交（不推荐在已推送的提交上使用）：

```bash
git commit --amend
```

#### 查看提交历史

查看所有提交历史：

```bash
git log
```

简洁显示历史：

```bash
git log --oneline
```

查看特定文件的历史：

```bash
git log --follow filename.txt
```

### 4.3 远程仓库操作

#### 查看远程仓库

```bash
git remote -v
```

#### 添加远程仓库

```bash
git remote add origin https://github.com/username/repository.git
```

#### 推送更改到远程仓库

```bash
git push origin main
# 首次推送时可能需要设置上游分支
git push -u origin main
```

#### 从远程仓库拉取更改

```bash
git pull origin main
```

#### 克隆特定分支

```bash
git clone -b branch-name https://github.com/username/repository.git
```

## 五、Git分支管理

### 5.1 分支基础

#### 查看分支

```bash
git branch
# 查看包括远程分支在内的所有分支
git branch -a
```

#### 创建分支

```bash
git branch new-branch
```

#### 切换分支

```bash
git checkout new-branch
# Git 2.23+版本也可以使用
# git switch new-branch
```

#### 创建并切换分支

```bash
git checkout -b new-branch
# Git 2.23+版本也可以使用
# git switch -c new-branch
```

#### 合并分支

将其他分支的更改合并到当前分支：

```bash
git merge feature-branch
```

#### 删除分支

```bash
git branch -d feature-branch
# 强制删除未合并的分支
git branch -D feature-branch
```

### 5.2 分支策略

常见的Git分支策略包括：

- **主分支（main/master）**：用于发布稳定版本
- **开发分支（develop）**：用于日常开发
- **功能分支（feature/xxx）**：用于开发新功能
- **修复分支（fix/xxx）**：用于修复bug
- **发布分支（release/xxx）**：用于准备发布

## 六、Git解决冲突

在多人协作或合并分支时，可能会遇到代码冲突。解决冲突的步骤如下：

1. 执行`git status`查看哪些文件有冲突
2. 打开冲突的文件，查找冲突标记（`<<<<<<<`, `=======`, `>>>>>>>`）
3. 编辑文件，解决冲突
4. 执行`git add`将解决冲突后的文件添加到暂存区
5. 执行`git commit`提交解决冲突后的更改

示例冲突标记：

```
<<<<<<< HEAD
当前分支的代码
=======
要合并的分支的代码
>>>>>>> feature-branch
```

## 七、Git高级操作

### 7.1 暂存（Stashing）

当你需要切换分支但又不想提交当前的更改时，可以使用暂存功能：

```bash
# 暂存当前更改
git stash

# 查看所有暂存
git stash list

# 应用最近的暂存
git stash apply

# 应用特定的暂存
git stash apply stash@{2}

# 应用并删除暂存
git stash pop

# 删除特定暂存
git stash drop stash@{1}

# 清空所有暂存
git stash clear
```

### 7.2 撤销操作

#### 撤销工作目录的更改

```bash
git checkout -- filename.txt
```

#### 撤销暂存的更改

```bash
git reset HEAD filename.txt
# 或者撤销所有暂存
git reset HEAD
```

#### 回滚到特定提交

```bash
git reset --hard commit_hash
```

#### 撤销已推送的更改

```bash
git revert commit_hash
```

### 7.3 标签管理

标签常用于标记特定的发布版本：

```bash
# 创建轻量级标签
git tag v1.0.0

# 创建带注释的标签
git tag -a v1.0.0 -m "Version 1.0.0"

# 查看所有标签
git tag

# 查看特定标签的信息
git show v1.0.0

# 推标签到远程仓库
git push origin v1.0.0
# 推送所有标签
git push origin --tags
```

## 八、Git工作流模型

### 8.1 集中式工作流

类似于SVN的工作流，所有开发者都在一个主分支上工作：

1. 克隆中央仓库
2. 进行更改并提交
3. 推送到中央仓库

### 8.2 功能分支工作流

每个新功能都在单独的分支上开发：

1. 创建功能分支
2. 在功能分支上开发
3. 推送到远程仓库
4. 创建Pull Request/Merge Request
5. 代码审查后合并到主分支

### 8.3 Gitflow工作流

一个更复杂的工作流，定义了严格的分支模型：

1. 使用main/master和develop两个主要分支
2. 功能在feature分支上开发，完成后合并到develop
3. 准备发布时，从develop创建release分支
4. 修复bug使用hotfix分支，完成后合并到main和develop

### 8.4 Forking工作流

适用于开源项目，每个贡献者都有自己的仓库副本：

1. Fork原始仓库
2. 克隆自己的Fork
3. 创建功能分支
4. 推送到自己的Fork
5. 创建Pull Request到原始仓库

## 九、Git最佳实践

1. **频繁提交**：小而频繁的提交比大而少的提交更好
2. **有意义的提交消息**：编写清晰、描述性的提交消息
3. **定期拉取**：定期从远程仓库拉取最新更改
4. **使用分支**：为不同的功能、修复创建单独的分支
5. **避免提交大文件**：使用.gitignore文件排除不需要版本控制的文件
6. **提交前测试**：确保代码能正常工作后再提交
7. **定期清理**：删除不再需要的分支和暂存
8. **代码审查**：使用Pull Request/Merge Request进行代码审查

## 十、Git常见问题及解决方案

### 10.1 忘记添加文件到.gitignore

如果已经提交了应该被忽略的文件：

```bash
# 从Git中删除文件但保留在本地
git rm --cached filename
# 然后更新.gitignore文件并提交更改
```

### 10.2 撤销已推送的错误提交

```bash
# 方法1：创建新提交来撤销旧提交
git revert commit_hash

# 方法2：重写历史（谨慎使用，可能影响他人）
git reset --hard commit_hash
git push --force origin branch_name
```

### 10.3 找回丢失的提交

如果不小心删除了分支或提交：

```bash
git reflog
# 找到丢失的提交的哈希值
git checkout commit_hash
# 或者创建新分支指向该提交
git branch recover-branch commit_hash
```

## 十一、Git图形化工具

除了命令行外，还有许多图形化的Git工具可以使用：

- **Git GUI**：Git自带的图形化界面
- **GitHub Desktop**：GitHub官方的桌面客户端
- **SourceTree**：Atlassian开发的免费Git客户端
- **GitKraken**：功能强大的Git客户端，有免费版和付费版
- **VS Code Git集成**：VS Code内置的Git功能
- **IntelliJ IDEA Git集成**：JetBrains IDE内置的Git功能

## 十二、总结

Git是一个功能强大的分布式版本控制系统，通过本文的介绍，我们了解了Git的基础概念、安装配置、常用命令、分支管理、解决冲突、高级操作、工作流模型、最佳实践以及常见问题的解决方案。掌握Git对于现代软件开发非常重要，它不仅可以帮助你有效地管理代码，还能促进团队协作和提高开发效率。

随着使用经验的积累，你会更加熟练地运用Git来管理你的项目。记住，Git的学习曲线可能有点陡峭，但一旦掌握，它将成为你编程工具箱中不可或缺的工具。