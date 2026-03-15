import argparse
from gitscribe.generator import generate_commit_message_from_file

def main():
    parser = argparse.ArgumentParser(prog="gitscribe")
    parser.add_argument("-t","--type", type= str, choices=['m', 'a', 'r'], help="what type of commit, either: modify, add, or remove")
    parser.add_argument( "-cf","--changed_filename", help="filename of changed file", type=str)
    parser.add_argument("-of","--old_filename", help="filename old file", type=str, nargs='?', default='no_file_given')
    parser.add_argument( "-nm",'--num_msgs', help="number of commit messages to generate", type=int, nargs='?', default=1)

    args = parser.parse_args()
    commit_type = args.type

    if (commit_type == "m" and args.old_filename != "no_file_given"):
        print("Your changed file is " + args.changed_filename + "\nYour old file is: " + args.old_filename)
        # generate commit message
        commit_message_arr = generate_commit_message_from_file(args.num_msgs, args.old_filename, args.changed_filename)
        print("Generated commit messages:")
        for msg in commit_message_arr:
            print(msg)
    # getchange(args.filename)
    elif (commit_type == "a"):
        for i in range(args.num_msgs):
            print("added file: " + args.changed_filename)
    elif (commit_type == "r"):
        for i in range(args.num_msgs):
            print("removed file: " + args.changed_filename)
    else:
        print("Input given not valid.")
