import argparse, json
from pathlib import Path
from git import Repo
from gitscribe.git_utils import generate_summary_from_combined_diff
from gitscribe.generator import generate_commit_message_from_summary


def find_git_root() -> Path | None:
    """
    Find the nearest Git repository root from the current working directory.

    Returns:
        Path | None: The repository root if found, otherwise None.
    """
    cwd = Path.cwd()

    for parent in [cwd] + list(cwd.parents):
        if (parent / ".git").is_dir():
            return parent

    return None


def read_head_file(head, rel_path: str) -> str | None:
    """
    Read a file from the HEAD commit.

    Args:
        head: The HEAD commit object.
        rel_path (str): The file path relative to the repo root.

    Returns:
        str | None: The file contents if found, otherwise None.
    """
    try:
        blob = head.tree / rel_path
        return blob.data_stream.read().decode("utf-8", errors="ignore")
    except Exception:
        return None


def read_working_file(repo_root: Path, rel_path: str) -> str | None:
    """
    Read a file from the current working directory.

    Args:
        repo_root (Path): The root of the repository.
        rel_path (str): The file path relative to the repo root.

    Returns:
        str | None: The file contents if found, otherwise None.
    """
    file_path = repo_root / rel_path

    if not file_path.exists() or not file_path.is_file():
        return None

    return file_path.read_text(encoding="utf-8", errors="ignore")


def build_combined_diff_text(
    changed_files: list[tuple[str, str, str, str]]
) -> str:
    """
    Build one combined diff-like text block from all changed files.

    Args:
        changed_files (list[tuple[str, str, str, str]]):
            A list of tuples in the format:
            (file_path, change_type, old_content, new_content)

    Returns:
        str: A combined text representation of all file changes.
    """
    sections = []

    for file_path, change_type, old_content, new_content in changed_files:
        section = (
            f"File: {file_path}\n"
            f"Change Type: {change_type}\n"
            f"--- OLD VERSION ---\n"
            f"{old_content}\n\n"
            f"--- NEW VERSION ---\n"
            f"{new_content}\n"
        )
        sections.append(section)

    return "\n\n".join(sections)


def main():
    parser = argparse.ArgumentParser(prog="gitscribe")
    
    subparsers = parser.add_subparsers(dest="command")
    
    subparsers.add_parser(
        "setup",
        help="configure GitScribe for your system"
    )

    # generate command
    generate_parser = subparsers.add_parser(
        "generate",
        help="generate commit message suggestions"
    )

    generate_parser.add_argument(
        "-nm",
        "--num_msgs",
        type=int,
        default=3,
        help="number of commit messages to generate"
    )

    args = parser.parse_args()

    match args.command:
        case "setup":
            print("Welcome to GitScribe! This setup command will guide you through configuring GitScribe for your system.")
            print("Luckily for you, GitScribe is designed to work as seamlessly as possible. The only setup step is to input your GitHub personal access token (for GitHub Models).")
            api_key = input("Please enter your GitHub personal access token (you can find this in your GitHub account settings): ")
            
            app_config = {
                "OPENAI_API_KEY": api_key
            }
            
            config_dir = Path.home() / ".gitscribe"
            config_dir.mkdir(parents=True, exist_ok=True)

            config_path = config_dir / "config.json"

            config_path.write_text(json.dumps(app_config, indent=2))

            print(f"Configuration saved to {config_path}. You can now run gitscribe (gs) to generate your messages! Happy coding!")
            
        case "generate":
            MIN_MSGS = 1
            MAX_MSGS = 10
            if (args.num_msgs < MIN_MSGS):
                print("Number of messages must be at least 1.")
                return
            elif (args.num_msgs > MAX_MSGS):
                print("Number of messages may not exceed 10.")
                return
            
            repo_root = find_git_root()
            if repo_root is None:
                print("No .git directory found in current or parent directories.")
                return

            print(f".git directory found at: {repo_root / '.git'}")

            repo = Repo(repo_root)
            head = repo.head.commit
            diffs = head.diff(None)

            if not diffs:
                print("No working tree changes found.")
                return

            changed_files: list[tuple[str, str, str, str]] = []

            for diff in diffs:
                rel_path = diff.a_path or diff.b_path
                if rel_path is None:
                    continue

                old_content = read_head_file(head, rel_path)
                new_content = read_working_file(repo_root, rel_path)

                if old_content is None and new_content is None:
                    continue

                if old_content is None:
                    change_type = "added"
                    old_content = ""
                elif new_content is None:
                    change_type = "removed"
                    new_content = ""
                else:
                    change_type = "modified"

                changed_files.append((rel_path, change_type, old_content, new_content))

            if not changed_files:
                print("No readable file changes found.")
                return

            combined_diff_text = build_combined_diff_text(changed_files)

            print("\nGenerating overall summary...")
            summary = generate_summary_from_combined_diff(combined_diff_text)

            print("\nSummary:")
            print(summary)

            print("\nGenerating commit messages...")
            messages = generate_commit_message_from_summary(args.num_msgs, summary)

            print("\nGenerated commit messages:")
            for msg in messages:
                print(f"- {msg}")
    
        

if __name__ == "__main__":
    main()
