import argparse
parser = argparse.ArgumentParser(prog="gitscribe")
parser.add_argument("type", help="what type of commit, either: modify, add, or remove", type= str, action="store_true")
parser.add_argument("changed_filename", help="filename of changed file", type=str, action="store_true")
parser.add_argument("old_filename", help="filename old file", type=str, action="store_true")

args = parser.parse_args()
commit_type = args.type

if (commit_type == "modify"):
    print("your changed file is " + args.changed_filename + "\nYour old file is: " + args.old_filename)
   # getchange(args.filename)
elif (commit_type == "add"):
    print("added file: " + args.changed_filename)
elif (commit_type == "remove"):
    print("removed file: " + args.changed_filename)
