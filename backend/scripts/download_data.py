import os
import argparse
from pydrive.auth import GoogleAuth
from pydrive.drive import GoogleDrive
import re


def auth_pydrive():
    gauth = GoogleAuth()
    # Try to load saved client credentials
    cred_path = os.path.join(os.path.expanduser('~'), '.pydrive_creds.json')
    try:
        gauth.LoadCredentialsFile(cred_path)
    except Exception:
        pass

    if gauth.credentials is None:
        # Local webserver flow - will open browser
        gauth.LocalWebserverAuth()
        gauth.SaveCredentialsFile(cred_path)
    elif gauth.access_token_expired:
        gauth.Refresh()
        gauth.SaveCredentialsFile(cred_path)
    else:
        gauth.Authorize()
    return GoogleDrive(gauth)


def list_files(drive, folder_id=None, q_extra=None, max_results=100):
    """List files in Drive. If folder_id provided, query within folder."""
    query_parts = []
    if folder_id:
        query_parts.append(f"'{folder_id}' in parents")
    if q_extra:
        query_parts.append(q_extra)
    query = ' and '.join(query_parts) if query_parts else None

    file_list = drive.ListFile({'q': query}).GetList()
    return file_list


def download_matching(drive, out_dir, name_pattern=None, folder_id=None):
    os.makedirs(out_dir, exist_ok=True)
    regex = re.compile(name_pattern) if name_pattern else None
    files = list_files(drive, folder_id=folder_id)
    matches = []
    for f in files:
        title = f['title']
        if regex:
            if regex.search(title):
                matches.append(f)
        else:
            matches.append(f)

    if not matches:
        print('No matching files found.')
        return

    for f in matches:
        fname = f['title']
        outpath = os.path.join(out_dir, fname)
        print(f"Downloading {fname} -> {outpath}")
        f.GetContentFile(outpath)
    print(f"Downloaded {len(matches)} files to {out_dir}")


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--out', default='data/raw', help='Output directory')
    parser.add_argument('--pattern', default='Landslide_Feature_Export', help='Regex pattern to match Drive filenames')
    parser.add_argument('--folder-id', default=None, help='Optional Drive folder id to search inside')
    args = parser.parse_args()

    drive = auth_pydrive()
    download_matching(drive, args.out, args.pattern, args.folder_id)
