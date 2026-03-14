import argparse
parser = argparse.ArgumentParser(prog="gitscribe")
parser.add_argument("--type", type= str, choices=['modify', 'add', 'remove'], help="what type of commit, either: modify, add, or remove")
parser.add_argument("changed_filename", help="filename of changed file", type=str)
parser.add_argument("old_filename", help="filename old file", type=str, nargs='?', default='no_file_given')

args = parser.parse_args()
commit_type = args.type

if (commit_type == "modify" and args.old_filename != "no_file_given"):
    print("Your changed file is " + args.changed_filename + "\nYour old file is: " + args.old_filename)
   # getchange(args.filename)
elif (commit_type == "add"):
    print("added file: " + args.changed_filename)
elif (commit_type == "remove"):
    print("removed file: " + args.changed_filename)

else:
    print("Input given not valid.")
