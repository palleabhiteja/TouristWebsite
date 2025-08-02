import os

def print_tree(start_path='.', prefix=''):
    if not os.path.exists(start_path):
        print(f"Path does not exist: {start_path}")
        return

    try:
        entries = [e for e in os.listdir(start_path) if e != 'node_modules']
        entries.sort()
        total = len(entries)
        
        for idx, entry in enumerate(entries):
            path = os.path.join(start_path, entry)
            connector = '├── ' if idx < total - 1 else '└── '

            print(prefix + connector + entry)

            if os.path.isdir(path):
                extension = '│   ' if idx < total - 1 else '    '
                print_tree(path, prefix + extension)
    except PermissionError:
        print(prefix + "└── [Permission Denied]")

# Set the directory path
base_path = r"C:\Users\R5 5500U\Aditya\Video\TandT-final"

print(os.path.basename(base_path) + "/")
print_tree(base_path)
