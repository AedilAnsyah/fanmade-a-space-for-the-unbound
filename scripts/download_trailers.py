import os
import json
import subprocess

TRAILERS = [
    {
        "id": "trailer_01_launch",
        "title": "Official Launch Trailer",
        "url": "https://youtu.be/8yGznOkpIGM"
    },
    {
        "id": "trailer_02_release_date",
        "title": "Release Date Announcement",
        "url": "https://youtu.be/_4yvH1x0Nlo"
    },
    {
        "id": "trailer_03_prologue",
        "title": "Prologue Trailer",
        "url": "https://youtu.be/QU50IxsWTn4"
    },
    {
        "id": "trailer_04_nintendo_indie",
        "title": "Nintendo Indie World Trailer",
        "url": "https://youtu.be/eoUJi7aX9EQ"
    },
    {
        "id": "trailer_05_gameplay",
        "title": "Official Gameplay Trailer",
        "url": "https://youtu.be/60M43B_-GwQ"
    },
    {
        "id": "trailer_06_animated_teaser",
        "title": "Animated Teaser Trailer",
        "url": "https://youtu.be/RH89oUUrXWU"
    },
    {
        "id": "trailer_07_music_story",
        "title": "Music & Story Spotlight",
        "url": "https://youtu.be/TXv3dqZQlvs"
    }
]

def main():
    target_dir = os.path.join(os.getcwd(), "public", "assets", "videos")
    os.makedirs(target_dir, exist_ok=True)
    
    python_bin = "/opt/homebrew/bin/python3.11"
    if not os.path.exists(python_bin):
        python_bin = "python3"

    print("🎬 Starting Trailer Videos Download (Lightweight MP4/WebM)...")

    for item in TRAILERS:
        filename = f"{item['id']}.mp4"
        filepath = os.path.join(target_dir, filename)

        if os.path.exists(filepath) and os.path.getsize(filepath) > 100000:
            size_mb = os.path.getsize(filepath) / (1024 * 1024)
            print(f"⏩ [Skip] {item['title']} already downloaded ({size_mb:.2f} MB)")
            continue

        print(f"📥 Downloading: {item['title']} ({item['url']})...")
        cmd = [
            python_bin, "-m", "yt_dlp",
            "--extractor-args", "youtube:player_client=android,ios",
            "-f", "18/best[ext=mp4][height<=480]/best[height<=480]",
            "-o", filepath,
            item["url"]
        ]
        
        try:
            res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, timeout=60)
            if res.returncode == 0 and os.path.exists(filepath):
                size_mb = os.path.getsize(filepath) / (1024 * 1024)
                print(f"✅ Success! Saved {filename} ({size_mb:.2f} MB)")
            else:
                print(f"❌ Error downloading {item['title']}: {res.stderr[-200:] if res.stderr else 'Unknown error'}")
        except Exception as e:
            print(f"⚠️ Exception downloading {item['title']}: {e}")

    # Update manifest
    manifest_path = os.path.join(os.getcwd(), "public", "assets", "manifest.json")
    if os.path.exists(manifest_path):
        with open(manifest_path, "r", encoding="utf-8") as f:
            manifest = json.load(f)
        
        # Add new video entries if not present
        existing_ids = {m["id"] for m in manifest}
        for item in TRAILERS:
            filename = f"{item['id']}.mp4"
            filepath = os.path.join(target_dir, filename)
            if os.path.exists(filepath) and item["id"] not in existing_ids:
                manifest.append({
                    "id": item["id"],
                    "title": item["title"],
                    "category": "videos",
                    "filename": filename,
                    "webPath": f"/assets/videos/{filename}",
                    "sizeKb": round(os.path.getsize(filepath) / 1024, 1),
                    "type": "video",
                    "sourceUrl": item["url"]
                })
        
        with open(manifest_path, "w", encoding="utf-8") as f:
            json.dump(manifest, f, indent=2)

    print("\n🎉 All trailer video downloads finished!")

if __name__ == "__main__":
    main()
