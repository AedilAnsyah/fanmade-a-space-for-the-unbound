import os
import json
import urllib.request
import urllib.parse
import re

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
}

ASSETS = [
    # Group images
    {
        "category": "images/group",
        "name": "group_01_trio",
        "url": "https://wallpaperaccess.com/full/29447338.jpg",
        "type": "image"
    },
    {
        "category": "images/group",
        "name": "group_02_cast_a",
        "url": "https://wallpaperaccess.com/full/29447353.jpg",
        "type": "image"
    },
    {
        "category": "images/group",
        "name": "group_02_cast_b",
        "url": "https://wallpaperaccess.com/full/29447333.jpg",
        "type": "image"
    },
    {
        "category": "images/group",
        "name": "group_02_cast_c",
        "url": "https://wallpaperaccess.com/full/29447347.jpg",
        "type": "image"
    },
    {
        "category": "images/group",
        "name": "group_03_trio_igdb",
        "url": "https://images.igdb.com/igdb/image/upload/t_720p/arjw5.webp",
        "type": "image"
    },

    # Raya & Nirmala
    {
        "category": "images/characters",
        "name": "raya_01_steam",
        "url": "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1201270/ss_07a0aaf3598903b39589e0484b2f87330cf72b19.1920x1080.jpg?t=1783577808",
        "type": "image"
    },
    {
        "category": "images/characters",
        "name": "raya_02_artstation",
        "url": "https://cdnb.artstation.com/p/assets/images/images/003/158/675/large/dimas-novan-2016-05-21-a-space-santai-work.jpg?1470416004",
        "type": "image"
    },
    {
        "category": "images/characters",
        "name": "nirmala_01_senja",
        "url": "https://wallpaperaccess.com/full/29447348.jpg",
        "type": "image"
    },
    {
        "category": "images/characters",
        "name": "nirmala_02_jembatan",
        "url": "https://wallpaperaccess.com/full/29447363.png",
        "type": "image"
    },
    {
        "category": "images/characters",
        "name": "raya_03_power",
        "url": "https://images.steamusercontent.com/ugc/2056492292345981129/9632FD3DB2888132ADEF0B9F9DCC7A02500EC406/?imw=1920&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
        "type": "image"
    },

    # Atma
    {
        "category": "images/characters",
        "name": "atma_01_jatuh",
        "url": "https://wallpaperaccess.com/full/29447354.jpg",
        "type": "image"
    },
    {
        "category": "images/characters",
        "name": "atma_02_senyum",
        "url": "https://wallpaperaccess.com/full/29447382.jpg",
        "type": "image"
    },
    {
        "category": "images/characters",
        "name": "atma_03_bubblegum",
        "url": "https://i.pinimg.com/1200x/65/2d/50/652d50ac3110e4752f1f46c958450531.jpg",
        "type": "image"
    },
    {
        "category": "images/characters",
        "name": "atma_04_jembatan_danau",
        "url": "https://wallpapercave.com/wp/wp11919629.png",
        "type": "image"
    },

    # Atma & Raya / Nirmala
    {
        "category": "images/characters",
        "name": "duo_01_atma_raya",
        "url": "https://wallpaperaccess.com/full/29447335.jpg",
        "type": "image"
    },
    {
        "category": "images/characters",
        "name": "duo_02_atma_raya",
        "url": "https://wallpaperaccess.com/full/29447320.jpg",
        "type": "image"
    },
    {
        "category": "images/characters",
        "name": "duo_03_atma_nirmala",
        "url": "https://i.pinimg.com/736x/08/c4/88/08c488e8f1162f77a0fd54be5b6ee752.jpg",
        "type": "image"
    },
    {
        "category": "images/characters",
        "name": "duo_04_atma_nirmala",
        "url": "https://i.pinimg.com/1200x/13/06/5d/13065d8ad741c1ce5692d2c5222fea8f.jpg",
        "type": "image"
    },
    {
        "category": "images/characters",
        "name": "duo_05_atma_raya",
        "url": "https://wallpaperaccess.com/full/29447336.png",
        "type": "image"
    },

    # Scene / Screenshots
    {
        "category": "images/scenes",
        "name": "scene_01_dark_item",
        "url": "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1201270/ss_ca725a56d2202a22b0bae768a44a9238b7596970.1920x1080.jpg?t=1783577808",
        "type": "image"
    },
    {
        "category": "images/scenes",
        "name": "scene_02_forest_dialog",
        "url": "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1201270/ss_494bd4858dc7a71a33e32dde02af44b5f640c0cd.1920x1080.jpg?t=1783577808",
        "type": "image"
    },
    {
        "category": "images/scenes",
        "name": "scene_03_combat",
        "url": "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1201270/ss_fece3cd88e9fbeadc92fd36771d8ce84e1e460e9.1920x1080.jpg?t=1783577808",
        "type": "image"
    },
    {
        "category": "images/scenes",
        "name": "scene_04_room_atma",
        "url": "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1201270/ss_57524c5480ca71d746f61cd0c10568f8e55f0db7.1920x1080.jpg?t=1783577808",
        "type": "image"
    },
    {
        "category": "images/scenes",
        "name": "scene_05_fire_room",
        "url": "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1201270/ss_3c3807fb37fb91db176c8c6a5c90e188e7d7314c.1920x1080.jpg?t=1783577808",
        "type": "image"
    },
    {
        "category": "images/scenes",
        "name": "scene_06_forest_peek",
        "url": "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1201270/ss_13e5138f96418a2e703238348e45a18dbdcd8a01.1920x1080.jpg?t=1783577808",
        "type": "image"
    },
    {
        "category": "images/scenes",
        "name": "scene_07_neighborhood",
        "url": "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1201270/ss_f5cc3f084909ebd610dc4172a8afce857793ae6b.1920x1080.jpg?t=1783577808",
        "type": "image"
    },
    {
        "category": "images/scenes",
        "name": "scene_08_school",
        "url": "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1201270/ss_d33d6ca8bd2d5091d373f26e2d336fe9a4742e1e.1920x1080.jpg?t=1783577808",
        "type": "image"
    },
    {
        "category": "images/scenes",
        "name": "scene_09_construction",
        "url": "https://images.igdb.com/igdb/image/upload/t_720p/sc7o8g.webp",
        "type": "image"
    },
    {
        "category": "images/scenes",
        "name": "scene_10_monster_cat",
        "url": "https://images.igdb.com/igdb/image/upload/t_720p/sc7o8b.webp",
        "type": "image"
    },
    {
        "category": "images/scenes",
        "name": "scene_11_lake_joy",
        "url": "https://i0.wp.com/www.togeproductions.com/wp-content/uploads/2020/10/sCR-4.jpg?resize=980%2C551&ssl=1",
        "type": "image"
    },
    {
        "category": "images/scenes",
        "name": "scene_12_forest_man",
        "url": "https://i.pinimg.com/1200x/58/e9/3c/58e93c102de0b2f0326c77bf7c011fb6.jpg",
        "type": "image"
    },
    {
        "category": "images/scenes",
        "name": "scene_13_header_cover",
        "url": "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1201270/header.jpg?t=1783577808",
        "type": "image"
    },
    {
        "category": "images/scenes",
        "name": "scene_14_bridge",
        "url": "https://wallpapercave.com/wp/wp11919692.png",
        "type": "image"
    },

    # Animated GIFs / Gameplay
    {
        "category": "gifs",
        "name": "gif_01_cinema",
        "url": "https://i0.wp.com/www.togeproductions.com/wp-content/uploads/2020/10/Atma-and-Raya-Cinema480x270.gif?ssl=1",
        "type": "gif"
    },
    {
        "category": "gifs",
        "name": "gif_02_cat_wonderland",
        "url": "https://i0.wp.com/www.togeproductions.com/wp-content/uploads/2020/10/Atma-in-Cat-Wonderland480x270.gif?ssl=1",
        "type": "gif"
    },
    {
        "category": "videos",
        "name": "video_01_forest_talk",
        "url": "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1201270/extras/e483eedbebfe2638b285248c6c60e447.webm?t=1783577808",
        "type": "video"
    },
    {
        "category": "gifs",
        "name": "gif_03_newspaper_park",
        "url": "https://i0.wp.com/www.togeproductions.com/wp-content/uploads/2020/10/SOL-newspaper_park.gif?resize=432%2C372&ssl=1",
        "type": "gif"
    },
    {
        "category": "gifs",
        "name": "gif_04_nirmala_wind",
        "url": "https://images.steamusercontent.com/ugc/2049736193954814891/C4B9E01EBF881FB0C4C5D909E9D1E5BFB9DF8182/?imw=1920&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
        "type": "image"
    },
    {
        "category": "gifs",
        "name": "gif_05_raya_bridge",
        "url": "https://images.steamusercontent.com/ugc/11191958273035140512/760BEDCFB732C144200AAAFC3FA03F5924BA9311/?imw=1920&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
        "type": "image"
    },
    {
        "category": "gifs",
        "name": "gif_06_kentongan",
        "url": "https://media1.tenor.com/m/eFNRxbt1XUAAAAAd/hehe-a-space-for-the-unbound.gif",
        "type": "gif"
    },
    {
        "category": "gifs",
        "name": "gif_07_nirmala_laugh",
        "url": "https://media1.tenor.com/m/B_G1EWZlmxYAAAAC/a-space-for-the-unbound-nirmala.gif",
        "type": "gif"
    },
]

TRAILERS = [
    {"id": "8yGznOkpIGM", "title": "Official Launch Trailer", "url": "https://youtu.be/8yGznOkpIGM?si=9FFUlvgdoxW0gJJg"},
    {"id": "_4yvH1x0Nlo", "title": "Release Date Announcement", "url": "https://youtu.be/_4yvH1x0Nlo?si=vCaY90fWxDHUpOlD"},
    {"id": "QU50IxsWTn4", "title": "Prologue Trailer", "url": "https://youtu.be/QU50IxsWTn4?si=wk9Uz3m-SYX-YUg6"},
    {"id": "eoUJi7aX9EQ", "title": "Nintendo Indie World Trailer", "url": "https://youtu.be/eoUJi7aX9EQ?si=cElG2X415yoBlBrG"},
    {"id": "60M43B_-GwQ", "title": "Official Gameplay Trailer", "url": "https://youtu.be/60M43B_-GwQ?si=xwNK-cBPY-nE5EPz"},
    {"id": "RH89oUUrXWU", "title": "Animated Teaser Trailer", "url": "https://youtu.be/RH89oUUrXWU?si=ICrf-TS1dBaeONJ7"},
    {"id": "TXv3dqZQlvs", "title": "Music & Story Spotlight", "url": "https://youtu.be/TXv3dqZQlvs?si=hlELmeC_cL5oygnd"},
]

def download_file(url, target_path):
    parsed = urllib.parse.urlparse(url)
    headers = dict(HEADERS)
    headers["Referer"] = f"{parsed.scheme}://{parsed.netloc}/"
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req, timeout=20) as response:
        content = response.read()
        with open(target_path, "wb") as f:
            f.write(content)
    return len(content)

def optimize_image_if_possible(source_path, target_webp_path, max_width=1920):
    try:
        from PIL import Image
        with Image.open(source_path) as img:
            # Check if animation
            is_animated = getattr(img, "is_animated", False)
            if is_animated:
                # Save as optimized animated webp or keep as gif
                img.save(target_webp_path, "WEBP", save_all=True, quality=80, method=4)
            else:
                # Resize if exceeding max_width
                if img.width > max_width:
                    ratio = max_width / float(img.width)
                    new_height = int(float(img.height) * float(ratio))
                    img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
                
                # Convert RGBA / RGB
                if img.mode in ("RGBA", "LA") or (img.mode == "P" and "transparency" in img.info):
                    img = img.convert("RGBA")
                else:
                    img = img.convert("RGB")
                img.save(target_webp_path, "WEBP", quality=82, method=6)
        return True
    except Exception as e:
        return False

def main():
    base_dir = os.path.join(os.getcwd(), "public", "assets")
    os.makedirs(base_dir, exist_ok=True)
    
    # Save trailers
    trailers_path = os.path.join(base_dir, "trailers.json")
    with open(trailers_path, "w", encoding="utf-8") as f:
        json.dump(TRAILERS, f, indent=2)
    print(f"✅ Saved trailers.json with {len(TRAILERS)} trailers")

    # Check Pillow
    has_pil = False
    try:
        from PIL import Image
        has_pil = True
        print("✅ Pillow is available for WebP compression")
    except ImportError:
        print("ℹ️ Pillow not installed. Attempting installation or will save raw optimized...")
        os.system("python3 -m pip install --user Pillow")
        try:
            from PIL import Image
            has_pil = True
            print("✅ Pillow successfully installed and loaded")
        except ImportError:
            print("⚠️ Running without Pillow. Raw formats will be preserved.")

    manifest = []
    success_count = 0
    fail_count = 0

    for item in ASSETS:
        folder = os.path.join(base_dir, item["category"])
        os.makedirs(folder, exist_ok=True)

        url = item["url"].replace("33e3 2dde", "33e32dde") # fix typo in url
        # Determine extension
        parsed_url = urllib.parse.urlparse(url)
        path_ext = os.path.splitext(parsed_url.path)[1].lower()
        if not path_ext or len(path_ext) > 5:
            if item["type"] == "gif":
                path_ext = ".gif"
            elif item["type"] == "video":
                path_ext = ".webm"
            else:
                path_ext = ".jpg"

        final_webp_path = os.path.join(folder, f"{item['name']}.webp")
        final_direct_path = os.path.join(folder, f"{item['name']}{path_ext}")
        
        if os.path.exists(final_webp_path):
            print(f"⏩ [Skip] {item['name']} already exists as WebP ({os.path.getsize(final_webp_path)/1024:.1f} KB)")
            success_count += 1
            manifest.append({
                "id": item["name"],
                "category": item["category"],
                "filename": f"{item['name']}.webp",
                "webPath": f"/assets/{item['category']}/{item['name']}.webp",
                "sizeKb": round(os.path.getsize(final_webp_path)/1024, 1),
                "type": "webp_image",
                "sourceUrl": url
            })
            continue

        if os.path.exists(final_direct_path):
            print(f"⏩ [Skip] {item['name']} already exists ({os.path.getsize(final_direct_path)/1024:.1f} KB)")
            success_count += 1
            manifest.append({
                "id": item["name"],
                "category": item["category"],
                "filename": f"{item['name']}{path_ext}",
                "webPath": f"/assets/{item['category']}/{item['name']}{path_ext}",
                "sizeKb": round(os.path.getsize(final_direct_path)/1024, 1),
                "type": item["type"],
                "sourceUrl": url
            })
            continue

        temp_filename = f"{item['name']}_raw{path_ext}"
        temp_path = os.path.join(folder, temp_filename)

        print(f"📥 Downloading [{item['name']}] from {parsed_url.netloc}...", end=" ", flush=True)
        try:
            size_bytes = download_file(url, temp_path)
            raw_kb = size_bytes / 1024
            
            # Optimization logic
            final_filename = f"{item['name']}{path_ext}"
            final_path = os.path.join(folder, final_filename)
            final_type = item["type"]

            if has_pil and item["type"] == "image":
                webp_filename = f"{item['name']}.webp"
                webp_path = os.path.join(folder, webp_filename)
                if optimize_image_if_possible(temp_path, webp_path):
                    final_filename = webp_filename
                    final_path = webp_path
                    final_type = "webp_image"
                    if os.path.exists(temp_path):
                        os.remove(temp_path)
                else:
                    if os.path.exists(final_path) and final_path != temp_path:
                        os.remove(final_path)
                    os.rename(temp_path, final_path)
            else:
                if os.path.exists(final_path) and final_path != temp_path:
                    os.remove(final_path)
                os.rename(temp_path, final_path)

            final_size_kb = os.path.getsize(final_path) / 1024
            rel_web_path = f"/assets/{item['category']}/{final_filename}"

            manifest.append({
                "id": item["name"],
                "category": item["category"],
                "filename": final_filename,
                "webPath": rel_web_path,
                "sizeKb": round(final_size_kb, 1),
                "originalKb": round(raw_kb, 1),
                "type": final_type,
                "sourceUrl": url
            })

            print(f"Done! {raw_kb:.1f}KB -> {final_size_kb:.1f}KB ({final_filename})")
            success_count += 1
        except Exception as e:
            print(f"FAILED: {e}")
            fail_count += 1
            if os.path.exists(temp_path):
                os.remove(temp_path)

    manifest_path = os.path.join(base_dir, "manifest.json")
    with open(manifest_path, "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2)

    print(f"\n==========================================")
    print(f"🎉 Complete! Success: {success_count}, Failed: {fail_count}")
    print(f"📋 Manifest generated at: {manifest_path}")
    print(f"==========================================")

if __name__ == "__main__":
    main()
