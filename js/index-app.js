(function() {
    // ========== FULL GAMES CATALOG (504 games) ==========
    // Original IDs 1-107 with real covers, IDs 108-504 with placeholders.
    const RAW_CATALOG = [
      { id: 1, name: "Phonopolis", category: "Adventure", thumb: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co4uyw.jpg", downloadUrl: "https://bzzhr.to/4is071av60w6", desc: "Musical retro adventure" },
      { id: 2, name: "Cyberpunk 2077", category: "RPG", thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1091500/library_600x900.jpg", downloadUrl: "https://bzzhr.to/u33dxmmaozb6", desc: "Night City open-world RPG" },
      { id: 3, name: "Elden Ring", category: "Action", thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1245620/library_600x900.jpg", downloadUrl: "https://bzzhr.to/u4w8cunxkbrz", desc: "Epic dark fantasy" },
      { id: 4, name: "Red Dead Redemption 2", category: "Adventure", thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1174180/library_600x900.jpg", downloadUrl: "https://bzzhr.to/ck7nob6r1bcv", desc: "Outlaw Wild West" },
      { id: 5, name: "Baldur's Gate 3", category: "RPG", thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1086940/library_600x900.jpg", downloadUrl: "https://bzzhr.to/g2c2uubvr8mt", desc: "Tactical RPG masterpiece" },
      { id: 6, name: "The Callisto Protocol", category: "Horror", thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1544020/library_600x900.jpg", downloadUrl: "https://bzzhr.to/ybdn7l807975", desc: "Terrifying space prison" },
      { id: 7, name: "Hogwarts Legacy", category: "RPG", thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/990080/library_600x900.jpg", downloadUrl: "https://bzzhr.to/sqsvm6qwnpnf", desc: "Wizarding world 1800s" },
      { id: 8, name: "Battlefield 2042", category: "Shooter", thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1517290/library_600x900.jpg", downloadUrl: "https://bzzhr.to/wb34m83386ee", desc: "All-out warfare" },
      { id: 9, name: "Ghostwire: Tokyo", category: "Action", thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1475810/library_600x900.jpg", downloadUrl: "https://bzzhr.to/4dotzn3l5304", desc: "Supernatural thriller" },
      { id: 10, name: "Forza Horizon 5", category: "Racing", thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1551360/library_600x900.jpg", downloadUrl: "https://bzzhr.to/od5lrbi5f9nr", desc: "Mexico racing paradise" },
      { id: 11, name: "God of War", category: "Action", thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1593500/library_600x900.jpg", downloadUrl: "https://bzzhr.to/lrtuuu7e0e73", desc: "Norse mythology journey" },
      { id: 12, name: "Titanfall 2", category: "Shooter", thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1237970/library_600x900.jpg", downloadUrl: "https://bzzhr.to/dx2fzxxlbxdf", desc: "Mech fast combat" },
      { id: 13, name: "The Witcher 3", category: "RPG", thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/292030/library_600x900.jpg", downloadUrl: "https://bzzhr.to/wge5xqrqagzc", desc: "Monster hunter" },
      { id: 14, name: "Hades", category: "Indie", thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1145360/library_600x900.jpg", downloadUrl: "https://bzzhr.to/3tanwgo44h51", desc: "Roguelike defy death" },
      { id: 15, name: "Control", category: "Action", thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/870780/library_600x900.jpg", downloadUrl: "https://bzzhr.to/5tnm97mt6ql1", desc: "Brutalist secrets" },
      { id: 16, name: "Lies of P", category: "Souls-like", thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1627720/library_600x900.jpg", downloadUrl: "https://bzzhr.to/fp0y3rkv07bt", desc: "Dark Pinocchio" },
      { id: 17, name: "Marvel's Spider-Man", category: "Action", thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1817070/library_600x900.jpg", downloadUrl: "https://bzzhr.to/716go6imtzta", desc: "Web-swing NYC" },
      { id: 18, name: "The Last of Us Part I", category: "Survival", thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1888930/library_600x900.jpg", downloadUrl: "https://bzzhr.to/z409lxi8ia60", desc: "Post-apocalyptic" },
      { id: 19, name: "Resident Evil Village", category: "Horror", thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1196590/library_600x900.jpg", downloadUrl: "https://bzzhr.to/f6jmxld7l5bb", desc: "Survival horror" },
      { id: 20, name: "Disco Elysium", category: "RPG", thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/632470/library_600x900.jpg", downloadUrl: "https://bzzhr.to/xuix9ww1zxdy", desc: "Detective RPG" },
      { id: 21, name: "Starfield", category: "Sci-Fi", thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1716740/library_600x900.jpg", downloadUrl: "https://bzzhr.to/gcybmedu43qw", desc: "Bethesda space RPG" },
      { id: 22, name: "Maneater", category: "Action", thumb: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUutB4hdjhV5G0bW2jeS7FnNKlNWLVnMQx8w&s", downloadUrl: "https://bzzhr.to/dfrc3xm0k4aj", desc: "Shark evolution" },
      { id: 23, name: "Halo Infinite", category: "Shooter", thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1240440/library_600x900.jpg", downloadUrl: "https://bzzhr.to/ahgxqh1krhhr", desc: "Master Chief returns" },
      { id: 24, name: "Returnal", category: "Roguelike", thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1649240/library_600x900.jpg", downloadUrl: "https://bzzhr.to/55tx9hxmqby5", desc: "Alien time loop" },
      { id: 25, name: "Death Stranding", category: "Action", thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1190460/library_600x900.jpg", downloadUrl: "https://bzzhr.to/plti1lbpecg2", desc: "Reconnect America" },
      { id: 26, name: "NARUTO: Ultimate Ninja STORM", category: "Fighting", thumb: "https://m.media-amazon.com/images/M/MV5BNzg5OTZhZjUtMmEwOC00ZGI1LTljOTgtNDMzMTA1YjlhNDA2XkEyXkFqcGc@._V1_.jpg", downloadUrl: "https://bzzhr.to/u9jwn92hljni", desc: "Anime fighting" },
      { id: 27, name: "Atomic Heart", category: "Shooter", thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/668580/library_600x900.jpg", downloadUrl: "https://bzzhr.to/g8k2ooemjemk", desc: "Soviet robot fury" },
      { id: 28, name: "Sekiro", category: "Action", thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/814380/library_600x900.jpg", downloadUrl: "https://bzzhr.to/bpf4xp9ptrlv", desc: "Shinobi masterpiece" },
      { id: 29, name: "Outer Wilds", category: "Exploration", thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/753640/library_600x900.jpg", downloadUrl: "https://bzzhr.to/z6s8iivvuogm", desc: "Time loop mystery" },
      { id: 30, name: "Hollow Knight", category: "Indie", thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/367520/library_600x900.jpg", downloadUrl: "https://bzzhr.to/h22jtc3h54d7", desc: "Insect kingdom" },
      { id: 31, name: "Stray", category: "Adventure", thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1332010/library_600x900.jpg", downloadUrl: "https://bzzhr.to/l4qu35mx12ff", desc: "Cyber cat journey" },
      { id: 32, name: "Sifu", category: "Fighting", thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2138710/library_600x900.jpg", downloadUrl: "https://bzzhr.to/fx56v77o7kqx", desc: "Kung fu revenge" },
      { id: 33, name: "Tunic", category: "Adventure", thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/553420/library_600x900.jpg", downloadUrl: "https://bzzhr.to/lqr8wcqgczir", desc: "Fox adventure" },
      { id: 34, name: "Inscryption", category: "Card Game", thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1092790/library_600x900.jpg", downloadUrl: "https://bzzhr.to/359mivnw7qe8", desc: "Dark roguelike cards" },
      { id: 35, name: "Celeste", category: "Platformer", thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/504230/library_600x900.jpg", downloadUrl: "https://bzzhr.to/fr8u2g2cbyus", desc: "Mountain climb" },
      { id: 36, name: "Cuphead", category: "Platformer", thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/268910/library_600x900.jpg", downloadUrl: "https://bzzhr.to/n6odzuvudocs", desc: "1930s run&gun" },
      { id: 37, name: "It Takes Two", category: "Co-op", thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1426210/library_600x900.jpg", downloadUrl: "https://bzzhr.to/ue1lr8hfi2ma", desc: "Couple adventure" },
      { id: 38, name: "Deathloop", category: "Shooter", thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1252330/library_600x900.jpg", downloadUrl: "https://bzzhr.to/ic57ee0u5u0t", desc: "Stylish time loop" },
      { id: 39, name: "Prey", category: "Sci-Fi", thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/480490/library_600x900.jpg", downloadUrl: "https://bzzhr.to/ey09ucebbcn2", desc: "Space station horror" },
      { id: 40, name: "Doom Eternal", category: "Shooter", thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/782330/library_600x900.jpg", downloadUrl: "https://bzzhr.to/vfne9aovpd81", desc: "Rip and tear" },
      { id: 41, name: "Ghostrunner", category: "Action", thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1139900/library_600x900.jpg", downloadUrl: "https://bzzhr.to/39ggvh410daz", desc: "One-hit kills" },
      { id: 42, name: "Subnautica", category: "Survival", thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/264710/library_600x900.jpg", downloadUrl: "https://bzzhr.to/2ige9h31jgcc", desc: "Alien ocean" },
      { id: 43, name: "No Man's Sky", category: "Exploration", thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/275850/library_600x900.jpg", downloadUrl: "https://bzzhr.to/j3uiwikp1rck", desc: "Infinite universe" },
      { id: 44, name: "Valheim", category: "Survival", thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/892970/library_600x900.jpg", downloadUrl: "https://gofile.io/d/BDQUnz", desc: "Viking purgatory" },
      { id: 45, name: "Deep Rock Galactic", category: "Co-op", thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/548430/library_600x900.jpg", downloadUrl: "https://bzzhr.to/wwy4jrtr0n56", desc: "Space dwarf mining" },
      { id: 46, name: "Terraria", category: "Sandbox", thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/105600/library_600x900.jpg", downloadUrl: "https://gofile.io/d/SbUsKd", desc: "2D sandbox" },
      { id: 47, name: "Minecraft", category: "Sandbox", thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1672970/library_600x900.jpg", downloadUrl: "https://bzzhr.to/ddrgxeyw5au2", desc: "Blocky survival" },
      { id: 48, name: "Palworld", category: "Survival", thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1623730/library_600x900.jpg", downloadUrl: "https://bzzhr.to/hut5tm9ud5vb", desc: "Monster capture survival" },
      { id: 49, name: "Lethal Company", category: "Horror", thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1966720/library_600x900.jpg", downloadUrl: "https://gofile.io/d/jMI5xb", desc: "Scavenge horror" },
      { id: 50, name: "Helldivers 2", category: "Shooter", thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/553850/library_600x900.jpg", downloadUrl: "https://bzzhr.to/pgm0h864s2jk", desc: "Co-op alien war" },
      { id: 51, name: "Tekken 7", category: "Fighting", thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/389730/library_600x900.jpg", downloadUrl: "https://bzzhr.to/dwvu7c0fuz4k", desc: "Iron fist tournament" },
      { id: 52, name: "Sea of Thieves", category: "Adventure", thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1172620/library_600x900.jpg", downloadUrl: "https://bzzhr.to/1ganqcr8iohx", desc: "Pirate sandbox" },
      { id: 53, name: "Monster Hunter World", category: "Action", thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/582010/library_600x900.jpg", downloadUrl: "https://gofile.io/d/TUQIGC", desc: "Epic monster hunts" },
      { id: 54, name: "Dark Souls III", category: "Souls-like", thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/374320/library_600x900.jpg", downloadUrl: "https://bzzhr.to/97ki7d4o0n3w", desc: "Relentless combat" },
      { id: 55, name: "Mortal Kombat 11", category: "Fighting", thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/976310/library_600x900.jpg", downloadUrl: "https://bzzhr.to/kqg860gm6uqh", desc: "Brutal fatalities" },
      { id: 56, name: "Street Fighter V", category: "Fighting", thumb: "https://upload.wikimedia.org/wikipedia/en/8/80/Street_Fighter_V_box_artwork.png", downloadUrl: "https://bzzhr.to/ddm8wvisthoh", desc: "Legendary fighting" },
      { id: 57, name: "FIFA 23", category: "Sports", thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1811260/library_600x900.jpg", downloadUrl: "https://bzzhr.to/zmasjuexf733", desc: "Football simulation" },
      { id: 58, name: "NBA 2K23", category: "Sports", thumb: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUdtk-s-lj07LPLCmz7MOuWDyAjac59RfjPXz0KbsBXUppJLjIGhP49Z1HaBXBmJg57esbsg&s=10", downloadUrl: "https://bzzhr.to/u87xysolly06", desc: "NBA experience" },
      { id: 59, name: "GTA V", category: "Open World", thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/271590/library_600x900.jpg", downloadUrl: "https://bzzhr.to/y3urdxf9h7qs", desc: "Los Santos heists" },
      { id: 60, name: "Watch Dogs Legion", category: "Open World", thumb: "https://upload.wikimedia.org/wikipedia/en/d/dc/Watch_Dogs_Legion_cover_art.webp", downloadUrl: "https://bzzhr.to/3is42p5qk08o", desc: "Hack London" },
      { id: 61, name: "Assassin's Creed Valhalla", category: "Action", thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2208920/library_600x900.jpg", downloadUrl: "https://bzzhr.to/u31t4e6ce6pj", desc: "Viking raids" },
      { id: 62, name: "Far Cry 6", category: "Shooter", thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2369390/library_600x900.jpg", downloadUrl: "https://bzzhr.to/yam0smah3pin", desc: "Revolution shooter" },
      { id: 63, name: "Rainbow Six Siege", category: "Tactical", thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/359550/library_600x900.jpg", downloadUrl: "https://bzzhr.to/78jt3u9xlpk2", desc: "Tactical shooter" },
      { id: 64, name: "NARUTO SHIPPUDEN: Storm 2", category: "Fighting", thumb: "https://mediaproxy.tvtropes.org/width/1200/https://static.tvtropes.org/pmwiki/pub/images/narutoshippudenultimateninjastorm2.png", downloadUrl: "https://datanodes.to/u6pel9e3ulvu/Naruto-Shippuden-Ultimate-Ninja-Storm-2.rar", desc: "Anime brawler" },
      { id: 65, name: "Shadow of Tomb Raider", category: "Action", thumb: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY9Sp6u2tNPdSKSt9nMKBmMs1NH7WOannFDjEBGwYm26ExuxMDsL4HEyqPBU6NIinxE8WV&s=10", downloadUrl: "https://bzzhr.to/9oi54d06m9ca", desc: "Lara Croft epic" },
      { id: 66, name: "Diablo II Resurrected", category: "RPG", thumb: "https://cdn.dekudeals.com/images/948589a864375b1ed3eede0711444fbf95add698/w500.jpg", downloadUrl: "https://bzzhr.to/37j7d94n211h", desc: "Classic remaster" },
      { id: 67, name: "Borderlands 3", category: "Shooter", thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/397540/library_600x900.jpg", downloadUrl: "https://bzzhr.to/rjs88tc5jela", desc: "Looter shooter" },
      { id: 68, name: "X4 Foundations", category: "Simulation", thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1085660/library_600x900.jpg", downloadUrl: "https://bzzhr.to/iw5bdqg0hqy5 ", desc: "Space sim" },
      { id: 69, name: "Outriders", category: "Shooter", thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/680420/library_600x900.jpg", downloadUrl: "https://datanodes.to/jjhebdsnj8x9/OUTRIDERS.rar", desc: "Co-op shooter" },
      { id: 70, name: "Mass Effect Legendary", category: "RPG", thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1328670/library_600x900.jpg", downloadUrl: "https://bzzhr.to/ncel6hqk6155", desc: "Sci-fi trilogy" },
      { id: 71, name: "Dragon Age Inquisition", category: "RPG", thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1222690/library_600x900.jpg", downloadUrl: "https://bzzhr.to/286sxi1a8jde", desc: "Thedas adventure" },
      { id: 72, name: "Divinity Original Sin 2", category: "RPG", thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/435150/library_600x900.jpg", downloadUrl: "https://bzzhr.to/ml8yox360aza", desc: "Tactical RPG" },
      { id: 73, name: "Pillars of Eternity 2", category: "RPG", thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/560130/library_600x900.jpg", downloadUrl: "https://datanodes.to/bhh2f0hg6bl5/Pillars-of-Eternity-II-Deadfire.rar", desc: "Isometric classic" },
      { id: 74, name: "Nioh 2", category: "Action", thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1325200/library_600x900.jpg", downloadUrl: "https://bzzhr.to/l62v0as1wij8", desc: "Samurai souls" },
      { id: 75, name: "Code Vein", category: "Souls-like", thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/678960/library_600x900.jpg", downloadUrl: "https://bzzhr.to/nwte63ywpuba", desc: "Anime souls" },
      { id: 76, name: "Scarlet Nexus", category: "Action", thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/775500/library_600x900.jpg", downloadUrl: "https://bzzhr.to/t575ri5f4ukd", desc: "Psychokinesis" },
      { id: 77, name: "Tales of Arise", category: "JRPG", thumb: "https://m.media-amazon.com/images/M/MV5BODY4ZjRlNDItZmViZC00ZjE3LWE3NjEtY2IxMTAyMzU3YmMxXkEyXkFqcGc@._V1_.jpg", downloadUrl: "https://bzzhr.to/v32hk3obj1af", desc: "Epic JRPG" },
      { id: 78, name: "Persona 5 Royal", category: "JRPG", thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1687950/library_600x900.jpg", downloadUrl: "https://bzzhr.to/xe9cqng5wmpc", desc: "Phantom thieves" },
      { id: 79, name: "Final Fantasy XVI", category: "JRPG", thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2515020/library_600x900.jpg", downloadUrl: "https://bzzhr.to/s2etw01mwu4l", desc: "Dark fantasy action" },
      { id: 80, name: "Dragon Ball FighterZ", category: "Fighting", thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/678950/library_600x900.jpg", downloadUrl: "https://bzzhr.to/6ty0xi32bs52", desc: "3v3 anime" },
      { id: 81, name: "Naruto Storm 4", category: "Fighting", thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/349040/library_600x900.jpg", downloadUrl: "https://bzzhr.to/gb4xhh25zw7q", desc: "Ultimate ninja" },
      { id: 82, name: "One Piece Odyssey", category: "JRPG", thumb: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5T6Zk-VndK0CB7BqQgaX7O_YKZ4mjri15QAenbW5o7Ubq_BsTaqHSv0AuNyK1poTg1uDjWA&s=10", downloadUrl: "https://bzzhr.to/1bueog81jiuw", desc: "Straw hat adventure" },
      { id: 83, name: "TrackDayR", category: "Racing", thumb: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc2woY9XoQroG73duSuFVlwEFmchg2gV2YnA&s", downloadUrl: "https://bzzhr.to/q28rq7bd1j6l", desc: "Motorcycle sim" },
      { id: 84, name: "Carry The Glass", category: "Indie", thumb: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDe6foYmAb6txDAOqhy2PwIFnJ3Vl0iRRsrmnVKM-2BN4equU8atOw4ppplAlJkBxS8mtT&s=10", downloadUrl: "https://datanodes.to/ic485k8siuhy/Carry_The_Glass.rar", desc: "Puzzle indie" },
      { id: 85, name: "COD Modern Warfare 2", category: "Shooter", thumb: "https://upload.wikimedia.org/wikipedia/en/5/52/Call_of_Duty_Modern_Warfare_2_%282009%29_cover.png", downloadUrl: "https://bzzhr.to/ioc6p3iku6yj", desc: "Classic shooter" },
      { id: 86, name: "Escape from Tarkov", category: "Tactical", thumb: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeThEiqk_342M5b2t2LxUfHGTCb6OrMghfAV-ZrEgxKvTHRzuBpOS4CAKZWFXCddYiy0Q0Fw&s=10", downloadUrl: "https://bzzhr.to/v3b3wgf6936d", desc: "Hardcore shooter" },
      { id: 87, name: "Prototype", category: "Action", thumb: "https://upload.wikimedia.org/wikipedia/en/b/b2/PROTOTYPE.png", downloadUrl: "https://bzzhr.to/qr75mr3s9sf9", desc: "Shapeshifter carnage" },
      { id: 88, name: "DayZ", category: "Survival", thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/221100/library_600x900.jpg", downloadUrl: "https://bzzhr.to/vuz7n5e0pocr", desc: "Zombie survival" },
      { id: 89, name: "Rust", category: "Survival", thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/252490/library_600x900.jpg", downloadUrl: "https://bzzhr.to/jmvrppg5p38o", desc: "Brutal multiplayer" },
      { id: 90, name: "ARK Survival Evolved", category: "Survival", thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/346110/library_600x900.jpg", downloadUrl: "https://bzzhr.to/kbm2dupgc190", desc: "Dino survival" },
      { id: 91, name: "Lens Island", category: "Survival", thumb: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkkMFMh1CJHXybb1lv7e6XszyqGsPvzBfW64OQpiUlknU6m-dGaRl6o9R6XxiPlcWGjJl3&s=10", downloadUrl: "https://bzzhr.to/vlbbttq2ce0z", desc: "Mystery forest" },
      { id: 92, name: "Green Hell", category: "Survival", thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/815370/library_600x900.jpg", downloadUrl: "https://bzzhr.to/cfk3kb6xgdsv", desc: "Amazon survival" },
      { id: 93, name: "Planet Zoo", category: "Simulation", thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/703080/library_600x900.jpg", downloadUrl: "https://bzzhr.to/czn0geghuw2l", desc: "Zoo management" },
      { id: 94, name: "Cities Skylines", category: "Simulation", thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/255710/library_600x900.jpg", downloadUrl: "https://gofile.io/d/coYrVY", desc: "City builder" },
      { id: 95, name: "Stardew Valley", category: "Simulation", thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/413150/library_600x900.jpg", downloadUrl: "https://bzzhr.to/djg8400snxet", desc: "Farm life" },
      { id: 96, name: "Factorio", category: "Strategy", thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/427520/library_600x900.jpg", downloadUrl: "https://gofile.io/d/agOLxt", desc: "Factory automation" },
      { id: 97, name: "Civilization V", category: "Strategy", thumb: "https://m.media-amazon.com/images/M/MV5BYzJhODQwZGYtNjc3MS00Y2EyLThjMDEtYzVjNzRlMWUzN2UwXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg", downloadUrl: "https://bzzhr.to/uivs589ck2d9", desc: "Turn-based empire" },
      { id: 98, name: "NightClub Simulator", category: "Simulation", thumb: "https://cdn.sidequestvr.com/file/2967333/library_600x900_2x.jpg", downloadUrl: "https://bzzhr.to/8ch0xfzgbxgu", desc: "Club management" },
      { id: 99, name: "Age of Empires IV", category: "Strategy", thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1466860/library_600x900.jpg", downloadUrl: "https://bzzhr.to/fp6zpbqko0z1", desc: "Historic RTS" },
      { id: 100, name: "Hades II", category: "Roguelike", thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1145350/library_600x900.jpg", downloadUrl: "https://gofile.io/d/l2fyry", desc: "Witch of crossroads" },
      { id: 101, name: "GTA San Andreas", category: "Open World", thumb: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPOtv1ukDU4ZpbgeRxv2EIn5w5iSB5ucju7AhVF5Z3gVsWRz45wLYQ9SwWDAJPLOdEIvV2&s=10", downloadUrl: "https://bzzhr.to/798s0sck9y6i", desc: "Classic gangster" },
      { id: 102, name: "Naruto Storm 3 FB", category: "Fighting", thumb: "https://i.gadgets360cdn.com/products/large/708079-naruto-shippuden-ultimate-ninja-storm-3-full-burst-nintendo-switch-front-cover-1000x1000-1656482219.jpg", downloadUrl: "https://gofile.io/d/VXl1dd", desc: "Full Burst" },
      { id: 103, name: "Naruto Storm Connections", category: "Fighting", thumb: "https://sm.ign.com/ign_ap/cover/n/naruto-x-b/naruto-x-boruto-ultimate-ninja-storm-connections_xec3.jpg", downloadUrl: "https://bzzhr.to/pxv3wzml2uor", desc: "Ultimate connections" },
      { id: 104, name: "JUMP FORCE", category: "Fighting", thumb: "https://imgproxy.eneba.games/coyTS-ea5u6Qsb9mV-TPr8hqFWzQZSwiGf5hHdB8nDw/rs:fit:300/ar:1/czM6Ly9wcm9kdWN0/cy5lbmViYS5nYW1l/cy9wcm9kdWN0cy9T/X2szLWhJYzZDcFlF/RndnVnRTWXJ6MWxj/c3lna2dYZHFwTlFS/eldYaEFFLmpwZWc", downloadUrl: "https://bzzhr.to/1rv0xeou6ix2", desc: "Anime crossover" },
      { id: 105, name: "Tekken 8", category: "Fighting", thumb: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b4/Tekken_8_cover_art.jpg/250px-Tekken_8_cover_art.jpg", downloadUrl: "https://bzzhr.to/5imzy2erft79", desc: "King of fighters" },
      { id: 106, name: "NBA 2K16", category: "Sports", thumb: "https://m.media-amazon.com/images/M/MV5BOGNiZGI5NWQtNzU2Yi00MDA5LWE3NDEtOTZiODJjMWFlMDdmXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg", downloadUrl: "https://bzzhr.to/oby3fhxede6a", desc: "Classic basketball" },
      { id: 107, name: "Marvel’s Spider-Man 2", category: "Action, Adventure", thumb: "https://static.wikia.nocookie.net/spidermanps4/images/d/d4/Marvel%27s_Spider-Man_2_front_cover_%28US%29.png/revision/latest?cb=20230608203237", downloadUrl: "https://bzzhr.to/f9wmyj6bwidy", desc: "Web-swing NYC" },
        { id: 108, name: "GTA V LITE ", category: "Open World", thumb: "https://drive.google.com/file/d/1A_XVHcW0TFEfYvz89N9UFROixNH7II78/view?usp=sharing", downloadUrl: "https://vikingfile.com/f/bZxzaHgEu8#getea 5 lite v13.2.zip - 43.92 GB", desc: "Rockstar Games" },
        { id: 106, name: "NBA 2K17", category: "Sports", thumb: "https://upload.wikimedia.org/wikipedia/en/a/a0/NBA_2K17_cover_art.jpg", downloadUrl: "https://bzzhr.to/k7cvccq0thn0", desc: "Classic basketball" },
         { id: 106, name: "NBA 2K22", category: "Sports", thumb: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTliLhHIia7kuxs_RbnMPS7TfGXzREYdTDH4-imFLrMTt915usN-o9u0QbFirjTVQWOqMba&s=10", downloadUrl: "https://bzzhr.to/ii4k0mlzwvkw", desc: "Classic basketball" },
      // ========== ID 108 to 504 (new games, dynamic thumbnails) ==========
      { id: 111, name: "1348 Ex Voto", category: "Horror", thumb: "https://m.media-amazon.com/images/M/MV5BYTJiMTJlMjAtMWRmMy00YTE3LWEzZWQtMjJlODMwNmUzNzA2XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg", downloadUrl: "https://bzzhr.to/f9xkzwqa3wtz", desc: "Horror game" },
      { id: 112, name: "20 Minutes Till Dawn", category: "Indie", thumb: null, downloadUrl: "#", desc: "Survival shooter" },
      { id: 113, name: "2Dark", category: "Horror", thumb: null, downloadUrl: "#", desc: "Dark stealth horror" },
      { id: 114, name: "3 Minutes to Midnight", category: "Adventure", thumb: null, downloadUrl: "#", desc: "Comedy graphic adventure" },
      { id: 115, name: "30XX", category: "Indie", thumb: null, downloadUrl: "#", desc: "Mega roguelike" },
      { id: 116, name: "5D Chess With Multiverse Time Travel", category: "Strategy", thumb: null, downloadUrl: "#", desc: "Multiverse chess" },
      { id: 117, name: "60 Parsecs!", category: "Strategy", thumb: null, downloadUrl: "#", desc: "Sci-fi survival" },
      { id: 118, name: "60 Seconds!", category: "Strategy", thumb: null, downloadUrl: "#", desc: "Nuclear survival" },
      { id: 119, name: "60 Seconds! Reatomized", category: "Strategy", thumb: null, downloadUrl: "#", desc: "Remastered nuclear" },
      { id: 120, name: "7 Days to Die", category: "Survival", thumb: null, downloadUrl: "#", desc: "Zombie survival crafting" },
      { id: 121, name: "9 Days", category: "Adventure", thumb: null, downloadUrl: "#", desc: "Adventure game" },
      { id: 122, name: "9 Kings", category: "Strategy", thumb: null, downloadUrl: "#", desc: "Strategy game" },
      { id: 123, name: "9 Years of Shadows", category: "Action", thumb: null, downloadUrl: "#", desc: "Metroidvania" },
      { id: 124, name: "9-Bit Armies: A Bit Too Far", category: "Strategy", thumb: null, downloadUrl: "#", desc: "Retro RTS" },
      { id: 125, name: "911 Operator", category: "Simulation", thumb: null, downloadUrl: "#", desc: "Emergency dispatcher" },
      { id: 126, name: "A Dance of Fire and Ice", category: "Indie", thumb: null, downloadUrl: "#", desc: "Rhythm game" },
      { id: 127, name: "A Day Out", category: "Adventure", thumb: null, downloadUrl: "#", desc: "Adventure game" },
      { id: 128, name: "A Difficult Game About Climbing", category: "Indie", thumb: null, downloadUrl: "#", desc: "Climbing challenge" },
      { id: 129, name: "A Hat in Time", category: "Adventure", thumb: null, downloadUrl: "#", desc: "3D platformer" },
      { id: 130, name: "A House of Thieves", category: "Horror", thumb: null, downloadUrl: "#", desc: "Horror game" },
      { id: 131, name: "A Little to the Left", category: "Indie", thumb: null, downloadUrl: "#", desc: "Cozy puzzle" },
      { id: 132, name: "A Plague Tale: Innocence", category: "Adventure", thumb: null, downloadUrl: "#", desc: "Medieval survival" },
      { id: 133, name: "A Plague Tale: Requiem", category: "Adventure", thumb: null, downloadUrl: "#", desc: "Medieval sequel" },
      { id: 134, name: "A Quiet Place: The Road Ahead", category: "Horror", thumb: null, downloadUrl: "#", desc: "Stealth horror" },
      { id: 135, name: "A Short Hike", category: "Indie", thumb: null, downloadUrl: "#", desc: "Cozy exploration" },
      { id: 136, name: "A Space for the Unbound", category: "Adventure", thumb: null, downloadUrl: "#", desc: "Slice-of-life RPG" },
      { id: 137, name: "A Way Out", category: "Adventure", thumb: null, downloadUrl: "#", desc: "Co-op prison escape" },
      { id: 138, name: "Abiotic Factor", category: "Survival", thumb: null, downloadUrl: "#", desc: "Sci-fi survival" },
      { id: 139, name: "ABZU", category: "Adventure", thumb: null, downloadUrl: "#", desc: "Underwater journey" },
      { id: 140, name: "ACE COMBAT 7: SKIES UNKNOWN", category: "Action", thumb: null, downloadUrl: "#", desc: "Aerial combat" },
      { id: 141, name: "Across the Obelisk", category: "RPG", thumb: null, downloadUrl: "#", desc: "Co-op deckbuilder" },
      { id: 142, name: "Against the Storm", category: "Strategy", thumb: null, downloadUrl: "#", desc: "City builder roguelite" },
      { id: 143, name: "Age of Darkness: Final Stand", category: "Strategy", thumb: null, downloadUrl: "#", desc: "Survival RTS" },
      { id: 144, name: "Age of Empires II: Definitive", category: "Strategy", thumb: null, downloadUrl: "#", desc: "Classic RTS" },
      { id: 145, name: "Age of Empires: Definitive Edition", category: "Strategy", thumb: null, downloadUrl: "#", desc: "Historic RTS remaster" },
      { id: 146, name: "Age of Mythology: Retold", category: "Strategy", thumb: null, downloadUrl: "#", desc: "Mythological RTS" },
      { id: 147, name: "Age of Wonders 4", category: "Strategy", thumb: null, downloadUrl: "#", desc: "Fantasy 4X" },
      { id: 148, name: "AI Limit", category: "Action", thumb: null, downloadUrl: "#", desc: "Anime souls-like" },
      { id: 149, name: "Alan Wake 2", category: "Horror", thumb: null, downloadUrl: "#", desc: "Psychological horror" },
      { id: 150, name: "Alan Wake Remastered", category: "Horror", thumb: null, downloadUrl: "#", desc: "Horror thriller" },
      { id: 151, name: "Alaskan Road Truckers", category: "Simulation", thumb: null, downloadUrl: "#", desc: "Truck simulator" },
      { id: 152, name: "Ale & Tale Tavern", category: "Simulation", thumb: null, downloadUrl: "#", desc: "Tavern management" },
      { id: 153, name: "Alien: Isolation", category: "Horror", thumb: null, downloadUrl: "#", desc: "Survival horror" },
      { id: 154, name: "Aliens: Fireteam Elite", category: "Shooter", thumb: null, downloadUrl: "#", desc: "Co-op shooter" },
      { id: 155, name: "Aloft", category: "Survival", thumb: null, downloadUrl: "#", desc: "Sky island survival" },
      { id: 156, name: "Amanda the Adventurer", category: "Horror", thumb: null, downloadUrl: "#", desc: "Indie horror" },
      { id: 157, name: "American Truck Simulator", category: "Simulation", thumb: null, downloadUrl: "#", desc: "Truck driving sim" },
      { id: 158, name: "Among the Sleep Enhanced Edition", category: "Horror", thumb: null, downloadUrl: "#", desc: "Toddler horror" },
      { id: 159, name: "Among Us", category: "Strategy", thumb: null, downloadUrl: "#", desc: "Social deduction" },
      { id: 160, name: "ANIMAL WELL", category: "Indie", thumb: null, downloadUrl: "#", desc: "Atmospheric puzzle" },
      { id: 161, name: "Anno 1800", category: "Strategy", thumb: null, downloadUrl: "#", desc: "City builder 1800s" },
      { id: 162, name: "ANNO: Mutationem", category: "Action", thumb: null, downloadUrl: "#", desc: "Cyberpunk action" },
      { id: 163, name: "Another Crab's Treasure", category: "Action", thumb: null, downloadUrl: "#", desc: "Underwater souls-like" },
      { id: 164, name: "ANTONBLAST", category: "Action", thumb: null, downloadUrl: "#", desc: "Fast platformer" },
      { id: 165, name: "Apocalypse Party", category: "Action", thumb: null, downloadUrl: "#", desc: "Roguelite shooter" },
      { id: 166, name: "Aquatico", category: "Simulation", thumb: null, downloadUrl: "#", desc: "Underwater city builder" },
      { id: 167, name: "Aragami 2", category: "Action", thumb: null, downloadUrl: "#", desc: "Ninja stealth" },
      { id: 168, name: "ARK: Survival Ascended", category: "Survival", thumb: null, downloadUrl: "#", desc: "Dino survival UE5" },
      { id: 169, name: "Arma 3", category: "Shooter", thumb: null, downloadUrl: "#", desc: "Military simulation" },
      { id: 170, name: "ARMORED CORE VI FIRES OF RUBICON", category: "Action", thumb: null, downloadUrl: "#", desc: "Mech combat" },
      { id: 171, name: "art of rally", category: "Racing", thumb: null, downloadUrl: "#", desc: "Stylized rally racing" },
      { id: 172, name: "ASKA", category: "Survival", thumb: null, downloadUrl: "#", desc: "Viking village survival" },
      { id: 173, name: "Assassin's Creed Brotherhood", category: "Action", thumb: null, downloadUrl: "#", desc: "Brotherhood saga" },
      { id: 174, name: "Assassin's Creed IV Black Flag", category: "Action", thumb: null, downloadUrl: "#", desc: "Pirate assassin" },
      { id: 175, name: "Assassin's Creed Odyssey", category: "Action", thumb: null, downloadUrl: "#", desc: "Ancient Greece" },
      { id: 176, name: "Assassin's Creed Origins", category: "Action", thumb: null, downloadUrl: "#", desc: "Ancient Egypt" },
      { id: 177, name: "Assassin's Creed Syndicate", category: "Action", thumb: null, downloadUrl: "#", desc: "Victorian London" },
      { id: 178, name: "Assassin's Creed Unity", category: "Action", thumb: null, downloadUrl: "#", desc: "French Revolution" },
      { id: 179, name: "Assassin's Creed Mirage", category: "Action", thumb: null, downloadUrl: "#", desc: "Baghdad stealth" },
      { id: 180, name: "Assetto Corsa Competizione", category: "Racing", thumb: null, downloadUrl: "#", desc: "GT racing sim" },
      { id: 181, name: "Assetto Corsa EVO", category: "Racing", thumb: null, downloadUrl: "#", desc: "Next gen racing" },
      { id: 182, name: "ASTRONEER", category: "Simulation", thumb: null, downloadUrl: "#", desc: "Space exploration" },
      { id: 183, name: "Atelier Yumia", category: "RPG", thumb: null, downloadUrl: "#", desc: "Alchemy RPG" },
      { id: 184, name: "Avowed", category: "RPG", thumb: null, downloadUrl: "#", desc: "First-person RPG" },
      { id: 185, name: "Baba Is You", category: "Indie", thumb: null, downloadUrl: "#", desc: "Rule-bending puzzle" },
      { id: 186, name: "Baby Steps", category: "Indie", thumb: null, downloadUrl: "#", desc: "Walking simulator" },
      { id: 187, name: "Backpack Battles", category: "Strategy", thumb: null, downloadUrl: "#", desc: "Inventory auto battler" },
      { id: 188, name: "Backrooms: Escape Together", category: "Horror", thumb: null, downloadUrl: "#", desc: "Co-op backrooms horror" },
      { id: 189, name: "Balatro", category: "Indie", thumb: null, downloadUrl: "#", desc: "Poker roguelite" },
      { id: 190, name: "Baldur's Gate II: Enhanced Edition", category: "RPG", thumb: null, downloadUrl: "#", desc: "Classic RPG" },
      { id: 191, name: "Ballionaire", category: "Indie", thumb: null, downloadUrl: "#", desc: "Pinball roguelite" },
      { id: 192, name: "Barotrauma", category: "Simulation", thumb: null, downloadUrl: "#", desc: "Submarine survival" },
      { id: 193, name: "Batman Arkham Knight Premium", category: "Action", thumb: null, downloadUrl: "#", desc: "Dark Knight finale" },
      { id: 194, name: "Batman: Arkham Asylum GOTY", category: "Action", thumb: null, downloadUrl: "#", desc: "Asylum horror" },
      { id: 195, name: "Batman: Arkham City GOTY", category: "Action", thumb: null, downloadUrl: "#", desc: "Open world Gotham" },
      { id: 196, name: "Battlefield 1", category: "Shooter", thumb: null, downloadUrl: "#", desc: "WWI warfare" },
      { id: 197, name: "Battlefield 4", category: "Shooter", thumb: null, downloadUrl: "#", desc: "Modern combat" },
      { id: 198, name: "Battlefield V", category: "Shooter", thumb: null, downloadUrl: "#", desc: "WWII warfare" },
      { id: 199, name: "Battlefield 6", category: "Shooter", thumb: null, downloadUrl: "#", desc: "Next-gen warfare" },
      { id: 200, name: "BeamNG.drive", category: "Simulation", thumb: null, downloadUrl: "#", desc: "Soft body crash sim" },
      { id: 201, name: "Black Mesa Definitive Edition", category: "Shooter", thumb: null, downloadUrl: "#", desc: "Half-Life remake" },
      { id: 202, name: "Black Myth: Wukong", category: "Action", thumb: null, downloadUrl: "#", desc: "Monkey King souls-like" },
      { id: 203, name: "Blasphemous 2", category: "Action", thumb: null, downloadUrl: "#", desc: "Dark metroidvania" },
      { id: 204, name: "BLEACH Rebirth of Souls", category: "Fighting", thumb: null, downloadUrl: "#", desc: "Bleach fighter" },
      { id: 205, name: "Bloons TD 6", category: "Strategy", thumb: null, downloadUrl: "#", desc: "Tower defense" },
      { id: 206, name: "Blue Prince", category: "Indie", thumb: null, downloadUrl: "#", desc: "Puzzle exploration" },
      { id: 207, name: "Bodycam", category: "Shooter", thumb: null, downloadUrl: "#", desc: "Realistic multiplayer" },
      { id: 208, name: "Boneraiser Minions", category: "Strategy", thumb: null, downloadUrl: "#", desc: "Necromancer strategy" },
      { id: 209, name: "Borderlands 2", category: "Shooter", thumb: null, downloadUrl: "#", desc: "Cell-shaded looter" },
      { id: 210, name: "Botany Manor", category: "Indie", thumb: null, downloadUrl: "#", desc: "Cozy plant puzzle" },
      { id: 211, name: "Brotato", category: "Indie", thumb: null, downloadUrl: "#", desc: "Potato survivor" },
      { id: 212, name: "Buckshot Roulette", category: "Indie", thumb: null, downloadUrl: "#", desc: "Horror card game" },
      { id: 213, name: "Bully: Scholarship Edition", category: "Open World", thumb: null, downloadUrl: "#", desc: "School open world" },
      { id: 214, name: "Burnout Paradise Remastered", category: "Racing", thumb: null, downloadUrl: "#", desc: "Crash racing" },
      { id: 215, name: "Call of Duty 4: Modern Warfare", category: "Shooter", thumb: null, downloadUrl: "#", desc: "Classic modern warfare" },
      { id: 216, name: "Call of Duty Black Ops II", category: "Shooter", thumb: null, downloadUrl: "#", desc: "Future warfare" },
      { id: 217, name: "Call of Duty: Black Ops 6", category: "Shooter", thumb: null, downloadUrl: "#", desc: "Latest Black Ops" },
      { id: 218, name: "Call of Duty: Black Ops Cold War", category: "Shooter", thumb: null, downloadUrl: "#", desc: "Cold War ops" },
      { id: 219, name: "Call of Duty: Black Ops III", category: "Shooter", thumb: null, downloadUrl: "#", desc: "Future ops" },
      { id: 220, name: "Call of Duty: Modern Warfare 2019", category: "Shooter", thumb: null, downloadUrl: "#", desc: "Reboot warfare" },
      { id: 221, name: "Call of Duty: Modern Warfare II", category: "Shooter", thumb: null, downloadUrl: "#", desc: "Modern warfare 2" },
      { id: 222, name: "Call of Duty: Modern Warfare III", category: "Shooter", thumb: null, downloadUrl: "#", desc: "Modern warfare 3" },
      { id: 223, name: "Call of Duty: Vanguard", category: "Shooter", thumb: null, downloadUrl: "#", desc: "WWII vanguard" },
      { id: 224, name: "Call of Duty: WWII", category: "Shooter", thumb: null, downloadUrl: "#", desc: "WWII shooter" },
      { id: 225, name: "Car Mechanic Simulator 2021", category: "Simulation", thumb: null, downloadUrl: "#", desc: "Car repair sim" },
      { id: 226, name: "Cassette Beasts", category: "RPG", thumb: null, downloadUrl: "#", desc: "Monster collecting RPG" },
      { id: 227, name: "Castle Crashers", category: "Action", thumb: null, downloadUrl: "#", desc: "Co-op brawler" },
      { id: 228, name: "Cat Quest III", category: "RPG", thumb: null, downloadUrl: "#", desc: "Pirate cat RPG" },
      { id: 229, name: "Cataclismo", category: "Strategy", thumb: null, downloadUrl: "#", desc: "Tower defense builder" },
      { id: 230, name: "Caves of Qud", category: "RPG", thumb: null, downloadUrl: "#", desc: "Deep roguelike RPG" },
      { id: 231, name: "Chained Together", category: "Indie", thumb: null, downloadUrl: "#", desc: "Co-op climbing" },
      { id: 232, name: "Chants of Sennaar", category: "Adventure", thumb: null, downloadUrl: "#", desc: "Language puzzle" },
      { id: 233, name: "Children of Morta", category: "RPG", thumb: null, downloadUrl: "#", desc: "Family roguelite" },
      { id: 234, name: "Chivalry 2", category: "Action", thumb: null, downloadUrl: "#", desc: "Medieval combat" },
      { id: 235, name: "Clair Obscur: Expedition 33", category: "RPG", thumb: null, downloadUrl: "#", desc: "Turn-based RPG" },
      { id: 236, name: "Cities: Skylines II", category: "Simulation", thumb: null, downloadUrl: "#", desc: "City builder sequel" },
      { id: 237, name: "Citizen Sleeper 2", category: "RPG", thumb: null, downloadUrl: "#", desc: "Sci-fi narrative RPG" },
      { id: 238, name: "COCOON", category: "Indie", thumb: null, downloadUrl: "#", desc: "World-within-orb puzzle" },
      { id: 239, name: "Company of Heroes 3", category: "Strategy", thumb: null, downloadUrl: "#", desc: "WWII tactical RTS" },
      { id: 240, name: "Contraband Police", category: "Simulation", thumb: null, downloadUrl: "#", desc: "Border inspector sim" },
      { id: 241, name: "Core Keeper", category: "Indie", thumb: null, downloadUrl: "#", desc: "Underground survival" },
      { id: 242, name: "Coral Island", category: "Simulation", thumb: null, downloadUrl: "#", desc: "Tropical farming" },
      { id: 243, name: "Crusader Kings III", category: "Strategy", thumb: null, downloadUrl: "#", desc: "Medieval dynasty" },
      { id: 244, name: "Cult of the Lamb", category: "Action", thumb: null, downloadUrl: "#", desc: "Cult management" },
      { id: 245, name: "DAVE THE DIVER", category: "Adventure", thumb: null, downloadUrl: "#", desc: "Diving restaurant sim" },
      { id: 246, name: "Days Gone", category: "Open World", thumb: null, downloadUrl: "#", desc: "Biker zombie open world" },
      { id: 247, name: "Dead by Daylight", category: "Horror", thumb: null, downloadUrl: "#", desc: "Asymmetric horror" },
      { id: 248, name: "Dead Cells", category: "Action", thumb: null, downloadUrl: "#", desc: "Roguelite metroidvania" },
      { id: 249, name: "Dead Island 2", category: "Action", thumb: null, downloadUrl: "#", desc: "LA zombie slayer" },
      { id: 250, name: "Dead Space (2023)", category: "Horror", thumb: null, downloadUrl: "#", desc: "Space horror remake" },
      { id: 251, name: "Dead Space 2", category: "Horror", thumb: null, downloadUrl: "#", desc: "Space horror sequel" },
      { id: 252, name: "DEATH STRANDING 2: ON THE BEACH", category: "Action", thumb: null, downloadUrl: "#", desc: "Sam Porter returns" },
      { id: 253, name: "DEATH STRANDING DIRECTOR'S CUT", category: "Action", thumb: null, downloadUrl: "#", desc: "Enhanced edition" },
      { id: 254, name: "Death's Door", category: "Action", thumb: null, downloadUrl: "#", desc: "Crow reaper adventure" },
      { id: 255, name: "Deep Rock Galactic: Rogue Core", category: "Shooter", thumb: null, downloadUrl: "#", desc: "DRG roguelite" },
      { id: 256, name: "Demon Slayer: Hinokami Chronicles", category: "Fighting", thumb: null, downloadUrl: "#", desc: "Anime fighter" },
      { id: 257, name: "DREDGE", category: "Adventure", thumb: null, downloadUrl: "#", desc: "Dark fishing game" },
      { id: 258, name: "Drug Dealer Simulator 2", category: "Simulation", thumb: null, downloadUrl: "#", desc: "Crime empire sim" },
      { id: 259, name: "Dying Light 2 Stay Human", category: "Open World", thumb: null, downloadUrl: "#", desc: "Parkour zombie sequel" },
      { id: 260, name: "DYNASTY WARRIORS: ORIGINS", category: "Action", thumb: null, downloadUrl: "#", desc: "Warriors origins" },
      { id: 261, name: "Dyson Sphere Program", category: "Simulation", thumb: null, downloadUrl: "#", desc: "Megastructure factory" },
      { id: 262, name: "Eiyuden Chronicle: Hundred Heroes", category: "RPG", thumb: null, downloadUrl: "#", desc: "Classic JRPG" },
      { id: 263, name: "Elden Ring Deluxe Edition", category: "Action", thumb: null, downloadUrl: "#", desc: "Full deluxe package" },
      { id: 264, name: "ELDEN RING NIGHTREIGN", category: "Action", thumb: null, downloadUrl: "#", desc: "Co-op Elden Ring" },
      { id: 265, name: "Empire of the Ants", category: "Strategy", thumb: null, downloadUrl: "#", desc: "Ant colony strategy" },
      { id: 266, name: "Enshrouded", category: "Survival", thumb: null, downloadUrl: "#", desc: "Co-op survival RPG" },
      { id: 267, name: "Enter the Gungeon", category: "Action", thumb: null, downloadUrl: "#", desc: "Bullet-hell dungeon" },
      { id: 268, name: "Euro Truck Simulator 2", category: "Simulation", thumb: null, downloadUrl: "#", desc: "European truck driving" },
      { id: 269, name: "Europa Universalis IV", category: "Strategy", thumb: null, downloadUrl: "#", desc: "Grand strategy" },
      { id: 270, name: "F.E.A.R", category: "Shooter", thumb: null, downloadUrl: "#", desc: "Horror tactical shooter" },
      { id: 271, name: "Fable Anniversary", category: "RPG", thumb: null, downloadUrl: "#", desc: "Classic RPG remaster" },
      { id: 272, name: "Factorio (v2)", category: "Strategy", thumb: null, downloadUrl: "#", desc: "Space age factory" },
      { id: 273, name: "Fae Farm", category: "Simulation", thumb: null, downloadUrl: "#", desc: "Cozy farming RPG" },
      { id: 274, name: "Fallout 3: GOTY", category: "RPG", thumb: null, downloadUrl: "#", desc: "Post-nuclear DC" },
      { id: 275, name: "Fallout 4", category: "RPG", thumb: null, downloadUrl: "#", desc: "Post-nuclear Boston" },
      { id: 276, name: "Fallout: New Vegas", category: "RPG", thumb: null, downloadUrl: "#", desc: "Vegas wasteland" },
      { id: 277, name: "Far Cry 3", category: "Shooter", thumb: null, downloadUrl: "#", desc: "Tropical island shooter" },
      { id: 278, name: "Far Cry 4", category: "Shooter", thumb: null, downloadUrl: "#", desc: "Himalayan shooter" },
      { id: 279, name: "Far Cry 5", category: "Shooter", thumb: null, downloadUrl: "#", desc: "Montana cult shooter" },
      { id: 280, name: "Farming Simulator 25", category: "Simulation", thumb: null, downloadUrl: "#", desc: "Modern farming" },
      { id: 281, name: "FANTASY LIFE i", category: "RPG", thumb: null, downloadUrl: "#", desc: "Life sim RPG" },
      { id: 282, name: "FINAL FANTASY VII REBIRTH", category: "RPG", thumb: null, downloadUrl: "#", desc: "FF7 saga part 2" },
      { id: 283, name: "Final Fantasy VII Remake Intergrade", category: "RPG", thumb: null, downloadUrl: "#", desc: "Midgar reimagined" },
      { id: 284, name: "FINAL FANTASY X/X-2 HD Remaster", category: "RPG", thumb: null, downloadUrl: "#", desc: "Classic FF remaster" },
      { id: 285, name: "Five Nights at Freddy's: Security Breach", category: "Horror", thumb: null, downloadUrl: "#", desc: "Freddy Fazbear's Mega Pizzaplex" },
      { id: 286, name: "Forza Horizon 6", category: "Racing", thumb: null, downloadUrl: "#", desc: "Latest Horizon" },
      { id: 287, name: "Frostpunk 2", category: "Strategy", thumb: null, downloadUrl: "#", desc: "Frozen city survival" },
      { id: 288, name: "Gang Beasts", category: "Fighting", thumb: null, downloadUrl: "#", desc: "Gelatinous brawler" },
      { id: 289, name: "Gas Station Simulator", category: "Simulation", thumb: null, downloadUrl: "#", desc: "Gas station tycoon" },
      { id: 290, name: "Gears of War: Reloaded", category: "Shooter", thumb: null, downloadUrl: "#", desc: "Cover shooter remaster" },
      { id: 291, name: "God of War Ragnarök", category: "Action", thumb: null, downloadUrl: "#", desc: "Ragnarok saga" },
      { id: 292, name: "Going Medieval", category: "Simulation", thumb: null, downloadUrl: "#", desc: "Medieval settlement" },
      { id: 293, name: "Golf With Your Friends", category: "Sports", thumb: null, downloadUrl: "#", desc: "Mini golf multiplayer" },
      { id: 294, name: "Gotham Knights", category: "Action", thumb: null, downloadUrl: "#", desc: "Batman family co-op" },
      { id: 296, name: "Grand Theft Auto: Trilogy – Definitive", category: "Open World", thumb: null, downloadUrl: "#", desc: "Classic GTA remastered" },
      { id: 297, name: "Grounded", category: "Survival", thumb: null, downloadUrl: "#", desc: "Tiny survival backyard" },
      { id: 298, name: "Grounded 2", category: "Survival", thumb: null, downloadUrl: "#", desc: "Tiny survival sequel" },
      { id: 299, name: "GUILTY GEAR -STRIVE-", category: "Fighting", thumb: null, downloadUrl: "#", desc: "Anime fighter" },
      { id: 300, name: "Gunfire Reborn", category: "Shooter", thumb: null, downloadUrl: "#", desc: "FPS roguelite" },
      { id: 301, name: "Half-Life: Alyx", category: "Shooter", thumb: null, downloadUrl: "#", desc: "VR masterpiece" },
      { id: 302, name: "Halo: The Master Chief Collection", category: "Shooter", thumb: null, downloadUrl: "#", desc: "All Halo campaigns" },
      { id: 303, name: "Halls of Torment", category: "Action", thumb: null, downloadUrl: "#", desc: "Vampire-likes in hell" },
      { id: 304, name: "Hearts of Iron IV", category: "Strategy", thumb: null, downloadUrl: "#", desc: "WWII grand strategy" },
      { id: 305, name: "Hellblade: Senua's Sacrifice", category: "Action", thumb: null, downloadUrl: "#", desc: "Norse psychosis" },
      { id: 306, name: "Hellish Quart", category: "Fighting", thumb: null, downloadUrl: "#", desc: "Sword dueling sim" },
      { id: 307, name: "Hello Neighbor 2", category: "Horror", thumb: null, downloadUrl: "#", desc: "Creepy neighbor sequel" },
      { id: 308, name: "Hi-Fi RUSH", category: "Action", thumb: null, downloadUrl: "#", desc: "Rhythm action game" },
      { id: 309, name: "High On Life 2", category: "Shooter", thumb: null, downloadUrl: "#", desc: "Alien comedy shooter" },
      { id: 310, name: "HITMAN 3", category: "Action", thumb: null, downloadUrl: "#", desc: "World of Assassination" },
      { id: 311, name: "Hollow Knight: Silksong", category: "Action", thumb: null, downloadUrl: "#", desc: "Hornet adventure" },
      { id: 312, name: "Hollywood Animal", category: "Simulation", thumb: null, downloadUrl: "#", desc: "Movie studio tycoon" },
      { id: 313, name: "Horizon Forbidden West", category: "RPG", thumb: null, downloadUrl: "#", desc: "Aloy's western quest" },
      { id: 314, name: "Horizon Zero Dawn Remastered", category: "RPG", thumb: null, downloadUrl: "#", desc: "Remastered Aloy" },
      { id: 315, name: "House Flipper 2", category: "Simulation", thumb: null, downloadUrl: "#", desc: "Renovate and sell" },
      { id: 316, name: "HUNTER×HUNTER NEN×IMPACT", category: "Fighting", thumb: null, downloadUrl: "#", desc: "HxH fighter" },
      { id: 317, name: "Hytale", category: "Adventure", thumb: null, downloadUrl: "#", desc: "Block adventure RPG" },
      { id: 318, name: "ICARUS", category: "Survival", thumb: null, downloadUrl: "#", desc: "Survival prospecting" },
      { id: 319, name: "Indiana Jones and the Great Circle", category: "Adventure", thumb: null, downloadUrl: "#", desc: "Indy adventure" },
      { id: 320, name: "inZOI", category: "Simulation", thumb: null, downloadUrl: "#", desc: "Life simulation" },
      { id: 321, name: "Iron Lung", category: "Horror", thumb: null, downloadUrl: "#", desc: "Submarine horror" },
      { id: 322, name: "It Steals", category: "Horror", thumb: null, downloadUrl: "#", desc: "Indie horror" },
      { id: 323, name: "Jagged Alliance 3", category: "Strategy", thumb: null, downloadUrl: "#", desc: "Tactical mercenaries" },
      { id: 324, name: "JDM: Japanese Drift Master", category: "Racing", thumb: null, downloadUrl: "#", desc: "Japanese drift racing" },
      { id: 325, name: "Judgment", category: "Action", thumb: null, downloadUrl: "#", desc: "Yakuza detective" },
      { id: 326, name: "Jujutsu Kaisen Cursed Clash", category: "Fighting", thumb: null, downloadUrl: "#", desc: "Anime brawler" },
      { id: 327, name: "Jurassic World Evolution 2", category: "Simulation", thumb: null, downloadUrl: "#", desc: "Dino park builder" },
      { id: 328, name: "Katana ZERO", category: "Action", thumb: null, downloadUrl: "#", desc: "Stylish assassin" },
      { id: 329, name: "Kena: Bridge of Spirits", category: "Action", thumb: null, downloadUrl: "#", desc: "Spirit guide adventure" },
      { id: 330, name: "Kenshi", category: "RPG", thumb: null, downloadUrl: "#", desc: "Post-apoc squad RPG" },
      { id: 331, name: "Kill It With Fire! 2", category: "Action", thumb: null, downloadUrl: "#", desc: "Spider extermination" },
      { id: 332, name: "Killing Floor 3", category: "Shooter", thumb: null, downloadUrl: "#", desc: "Co-op zombie shooter" },
      { id: 333, name: "Kingdom Come: Deliverance II", category: "RPG", thumb: null, downloadUrl: "#", desc: "Medieval Bohemia sequel" },
      { id: 334, name: "KinitoPET", category: "Horror", thumb: null, downloadUrl: "#", desc: "Virtual pet horror" },
      { id: 335, name: "L.A. Noire", category: "Adventure", thumb: null, downloadUrl: "#", desc: "1940s detective" },
      { id: 336, name: "Last Epoch", category: "RPG", thumb: null, downloadUrl: "#", desc: "ARPG time travel" },
      { id: 337, name: "Left 4 Dead 2", category: "Shooter", thumb: null, downloadUrl: "#", desc: "Co-op zombie shooter" },
      { id: 338, name: "LEGO Star Wars: The Skywalker Saga", category: "Action", thumb: null, downloadUrl: "#", desc: "All 9 films in LEGO" },
      { id: 339, name: "Lethal Company", category: "Horror", thumb: null, downloadUrl: "#", desc: "Corporate scavengers" },
      { id: 340, name: "Liar's Bar", category: "Strategy", thumb: null, downloadUrl: "#", desc: "Bluffing card game" },
      { id: 341, name: "Lies of P", category: "Action", thumb: null, downloadUrl: "#", desc: "Dark Pinocchio" }, // duplicate, will be removed
      { id: 342, name: "Life is Strange: Double Exposure", category: "Adventure", thumb: null, downloadUrl: "#", desc: "Max Caulfield returns" },
      { id: 343, name: "Little Kitty, Big City", category: "Indie", thumb: null, downloadUrl: "#", desc: "Cozy cat adventure" },
      { id: 344, name: "Little Nightmares III", category: "Horror", thumb: null, downloadUrl: "#", desc: "Co-op horror" },
      { id: 345, name: "Lords of the Fallen", category: "Action", thumb: null, downloadUrl: "#", desc: "Dark fantasy souls-like" },
      { id: 346, name: "Lossless Scaling", category: "Simulation", thumb: null, downloadUrl: "#", desc: "Frame generation tool" },
      { id: 347, name: "Luma Island", category: "Simulation", thumb: null, downloadUrl: "#", desc: "Cozy island life" },
      { id: 348, name: "Mad Games Tycoon 2", category: "Simulation", thumb: null, downloadUrl: "#", desc: "Game studio manager" },
      { id: 349, name: "Mafia: Definitive Edition", category: "Action", thumb: null, downloadUrl: "#", desc: "1930s mob story" },
      { id: 350, name: "Mafia: The Old Country", category: "Action", thumb: null, downloadUrl: "#", desc: "Sicilian mob origins" },
      { id: 351, name: "Mandragora: Whispers of the Witch Tree", category: "RPG", thumb: null, downloadUrl: "#", desc: "Dark fantasy RPG" },
      { id: 352, name: "Manor Lords", category: "Strategy", thumb: null, downloadUrl: "#", desc: "Medieval settlement" },
      { id: 353, name: "MARVEL Cosmic Invasion", category: "Action", thumb: null, downloadUrl: "#", desc: "Marvel brawler" },
      { id: 354, name: "Marvel's Guardians of the Galaxy", category: "Action", thumb: null, downloadUrl: "#", desc: "Galaxy squad game" },
      { id: 355, name: "Marvel's Spider-Man: Miles Morales", category: "Action", thumb: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7_jVCPuoVqVVYyTxvbBafBZwunx1jYd8_ghIbivt2BkbHhGGD6I2sc9fjMQq8ZAMsWGKsVQ&s=10", downloadUrl: "https://bzzhr.to/67pt5szrjk0h", desc: "Miles web-swings" },
      { id: 356, name: "Max Payne 3", category: "Shooter", thumb: null, downloadUrl: "#", desc: "Bullet time thriller" },
      { id: 357, name: "Medieval Dynasty", category: "Simulation", thumb: null, downloadUrl: "#", desc: "Medieval life sim" },
      { id: 358, name: "METAL GEAR SOLID Δ: SNAKE EATER", category: "Action", thumb: null, downloadUrl: "#", desc: "Snake Eater remake" },
      { id: 359, name: "Metal: Hellsinger", category: "Action", thumb: null, downloadUrl: "#", desc: "Metal rhythm shooter" },
      { id: 360, name: "Metaphor: ReFantazio", category: "RPG", thumb: null, downloadUrl: "#", desc: "Fantasy JRPG" },
      { id: 361, name: "Metro Exodus", category: "Shooter", thumb: null, downloadUrl: "#", desc: "Post-nuclear survival" },
      { id: 362, name: "Microsoft Flight Simulator", category: "Simulation", thumb: null, downloadUrl: "#", desc: "Ultra-realistic flight" },
      { id: 363, name: "Mindseye", category: "Action", thumb: null, downloadUrl: "#", desc: "Action thriller" },
      { id: 364, name: "MiSide", category: "Horror", thumb: null, downloadUrl: "#", desc: "Yandere horror game" },
      { id: 365, name: "Monster Hunter: World", category: "Action", thumb: null, downloadUrl: "#", desc: "Flagship hunt" },
      { id: 366, name: "Monster Hunter Rise: Sunbreak", category: "Action", thumb: null, downloadUrl: "#", desc: "Rise expansion" },
      { id: 367, name: "Monster Hunter Stories 2", category: "RPG", thumb: null, downloadUrl: "#", desc: "Monster riding RPG" },
      { id: 368, name: "Monster Train 2", category: "Strategy", thumb: null, downloadUrl: "#", desc: "Deck building sequel" },
      { id: 369, name: "Moonlighter 2", category: "RPG", thumb: null, downloadUrl: "#", desc: "Shop keeper dungeon" },
      { id: 370, name: "Mortal Kombat: Legacy Kollection", category: "Fighting", thumb: null, downloadUrl: "#", desc: "MK trilogy collection" },
      { id: 371, name: "Mouthwashing", category: "Horror", thumb: null, downloadUrl: "#", desc: "Surreal horror" },
      { id: 372, name: "Mount & Blade II: Bannerlord", category: "Action", thumb: null, downloadUrl: "#", desc: "Medieval conquest" },
      { id: 373, name: "Moving Out 2", category: "Indie", thumb: null, downloadUrl: "#", desc: "Co-op movers chaos" },
      { id: 374, name: "MY HERO ACADEMIA: All's Justice", category: "Fighting", thumb: null, downloadUrl: "#", desc: "Hero academia fighter" },
      { id: 375, name: "My Summer Car", category: "Simulation", thumb: null, downloadUrl: "#", desc: "Finnish car building" },
      { id: 376, name: "My Time at Sandrock", category: "Simulation", thumb: null, downloadUrl: "#", desc: "Desert workshop sim" },
      { id: 377, name: "Mycopunk", category: "Shooter", thumb: null, downloadUrl: "#", desc: "Fungal co-op shooter" },
      { id: 380, name: "NASCAR 25", category: "Racing", thumb: null, downloadUrl: "#", desc: "Stock car racing" },
      { id: 381, name: "NBA 2K25", category: "Sports", thumb: null, downloadUrl: "#", desc: "Basketball simulation" },
      { id: 382, name: "Neon Abyss 2", category: "Action", thumb: null, downloadUrl: "#", desc: "Neon dungeon shooter" },
      { id: 383, name: "Neva", category: "Action", thumb: null, downloadUrl: "#", desc: "Wolf companion action" },
      { id: 384, name: "NieR:Automata", category: "Action", thumb: null, downloadUrl: "#", desc: "Android apocalypse" },
      { id: 385, name: "Nine Sols", category: "Action", thumb: null, downloadUrl: "#", desc: "Taopunk action" },
      { id: 386, name: "NINJA GAIDEN 2 Black", category: "Action", thumb: null, downloadUrl: "#", desc: "Ninja action remaster" },
      { id: 387, name: "NINJA GAIDEN 4", category: "Action", thumb: null, downloadUrl: "#", desc: "New ninja saga" },
      { id: 388, name: "Nioh 3", category: "Action", thumb: null, downloadUrl: "#", desc: "Samurai souls sequel" },
      { id: 389, name: "Noita", category: "Indie", thumb: null, downloadUrl: "#", desc: "Physics-based roguelite" },
      { id: 390, name: "Northgard", category: "Strategy", thumb: null, downloadUrl: "#", desc: "Viking clan strategy" },
      { id: 391, name: "OCTOPATH TRAVELER II", category: "RPG", thumb: null, downloadUrl: "#", desc: "8-path JRPG" },
      { id: 392, name: "OMORI", category: "Indie", thumb: null, downloadUrl: "#", desc: "Psychological RPG" },
      { id: 393, name: "Ori and the Will of the Wisps", category: "Indie", thumb: null, downloadUrl: "#", desc: "Beautiful platformer" },
      { id: 394, name: "OUTRIDERS", category: "Shooter", thumb: null, downloadUrl: "#", desc: "Sci-fi looter shooter" },
      { id: 395, name: "Outer Wilds", category: "Adventure", thumb: null, downloadUrl: "#", desc: "Solar system mystery" },
      { id: 396, name: "Pacific Drive", category: "Survival", thumb: null, downloadUrl: "#", desc: "Driving survival horror" },
      { id: 397, name: "PAYDAY 3", category: "Shooter", thumb: null, downloadUrl: "#", desc: "Heist co-op" },
      { id: 398, name: "PEAK", category: "Indie", thumb: null, downloadUrl: "#", desc: "Co-op mountain climb" },
      { id: 399, name: "Phasmophobia", category: "Horror", thumb: null, downloadUrl: "#", desc: "Ghost hunting co-op" },
      { id: 400, name: "Pizza Tower", category: "Action", thumb: null, downloadUrl: "#", desc: "Wario-inspired platformer" },
      { id: 401, name: "Planet Coaster", category: "Simulation", thumb: null, downloadUrl: "#", desc: "Theme park builder" },
      { id: 402, name: "Poppy Playtime", category: "Horror", thumb: null, downloadUrl: "#", desc: "Toy factory horror" },
      { id: 403, name: "PowerWash Simulator 2", category: "Simulation", thumb: null, downloadUrl: "#", desc: "Pressure washing zen" },
      { id: 404, name: "PRAGMATA", category: "Action", thumb: null, downloadUrl: "#", desc: "Sci-fi action" },
      { id: 405, name: "Project Zomboid", category: "Survival", thumb: null, downloadUrl: "#", desc: "Isometric zombie survival" },
      { id: 406, name: "Psychonauts 2", category: "Adventure", thumb: null, downloadUrl: "#", desc: "Mind-bending platformer" },
      { id: 407, name: "R.E.P.O.", category: "Horror", thumb: null, downloadUrl: "#", desc: "Co-op horror repo" },
      { id: 408, name: "Raft", category: "Survival", thumb: null, downloadUrl: "#", desc: "Ocean raft survival" },
      { id: 409, name: "Rain World", category: "Indie", thumb: null, downloadUrl: "#", desc: "Ecosystem platformer" },
      { id: 410, name: "Ranch Simulator", category: "Simulation", thumb: null, downloadUrl: "#", desc: "Ranch management" },
      { id: 411, name: "Ratchet & Clank: Rift Apart", category: "Action", thumb: null, downloadUrl: "#", desc: "Dimension-hopping duo" },
      { id: 412, name: "Rayman Legends", category: "Action", thumb: null, downloadUrl: "#", desc: "Co-op platformer" },
      { id: 413, name: "Ready or Not", category: "Shooter", thumb: null, downloadUrl: "#", desc: "Tactical SWAT shooter" },
      { id: 414, name: "REANIMAL", category: "Horror", thumb: null, downloadUrl: "#", desc: "Co-op horror" },
      { id: 415, name: "Red Dead Redemption", category: "Open World", thumb: null, downloadUrl: "#", desc: "Original Wild West" },
      { id: 416, name: "REMATCH", category: "Sports", thumb: null, downloadUrl: "#", desc: "Online football" },
      { id: 417, name: "Remnant II", category: "Shooter", thumb: null, downloadUrl: "#", desc: "Co-op souls shooter" },
      { id: 418, name: "REPLACED", category: "Action", thumb: null, downloadUrl: "#", desc: "Cyberpunk action" },
      { id: 419, name: "Resident Evil 4 Remake", category: "Horror", thumb: null, downloadUrl: "#", desc: "Masterpiece remade" },
      { id: 420, name: "Resident Evil Requiem", category: "Horror", thumb: null, downloadUrl: "#", desc: "Latest RE entry" },
      { id: 421, name: "RimWorld", category: "Simulation", thumb: null, downloadUrl: "#", desc: "Colony survival sim" },
      { id: 422, name: "Rise of the Ronin", category: "Action", thumb: null, downloadUrl: "#", desc: "Samurai open world" },
      { id: 423, name: "Risk of Rain 2", category: "Action", thumb: null, downloadUrl: "#", desc: "Roguelite third-person" },
      { id: 424, name: "RoboCop: Rogue City", category: "Shooter", thumb: null, downloadUrl: "#", desc: "Old Detroit enforcer" },
      { id: 425, name: "Rogue Legacy 2", category: "Action", thumb: null, downloadUrl: "#", desc: "Genealogy roguelite" },
      { id: 426, name: "Rooftops & Alleys", category: "Sports", thumb: null, downloadUrl: "#", desc: "Parkour game" },
      { id: 427, name: "Rotwood", category: "Action", thumb: null, downloadUrl: "#", desc: "Co-op brawler" },
      { id: 428, name: "RuneScape: Dragonwilds", category: "Survival", thumb: null, downloadUrl: "#", desc: "RuneScape survival" },
      { id: 429, name: "Sekiro: Shadows Die Twice", category: "Action", thumb: null, downloadUrl: "#", desc: "Ninja precision combat" },
      { id: 430, name: "Serious Sam 4", category: "Shooter", thumb: null, downloadUrl: "#", desc: "Alien mass slaughter" },
      { id: 431, name: "Session: Skate Sim", category: "Sports", thumb: null, downloadUrl: "#", desc: "Realistic skateboarding" },
      { id: 432, name: "SIGNALIS", category: "Horror", thumb: null, downloadUrl: "#", desc: "Sci-fi horror mystery" },
      { id: 433, name: "SILENT HILL 2 Remake", category: "Horror", thumb: null, downloadUrl: "#", desc: "Remake of the classic" },
      { id: 434, name: "SILENT HILL f", category: "Horror", thumb: null, downloadUrl: "#", desc: "Silent Hill Japan" },
      { id: 435, name: "Slay the Princess", category: "Indie", thumb: null, downloadUrl: "#", desc: "Dark narrative game" },
      { id: 436, name: "Slay the Spire 2", category: "Strategy", thumb: null, downloadUrl: "#", desc: "Roguelite deckbuilder" },
      { id: 437, name: "Slime Rancher 2", category: "Simulation", thumb: null, downloadUrl: "#", desc: "Cute ranching sequel" },
      { id: 438, name: "SnowRunner", category: "Simulation", thumb: null, downloadUrl: "#", desc: "Off-road truck sim" },
      { id: 439, name: "Solo Leveling: ARISE OVERDRIVE", category: "Action", thumb: null, downloadUrl: "#", desc: "Sung Jin-Woo action" },
      { id: 440, name: "Sons Of The Forest", category: "Survival", thumb: null, downloadUrl: "#", desc: "Cannibal forest horror" },
      { id: 441, name: "South of Midnight", category: "Action", thumb: null, downloadUrl: "#", desc: "Southern gothic adventure" },
      { id: 442, name: "Space Engineers 2", category: "Simulation", thumb: null, downloadUrl: "#", desc: "Space sandbox builder" },
      { id: 443, name: "Split Fiction", category: "Adventure", thumb: null, downloadUrl: "#", desc: "Co-op story adventure" },
      { id: 444, name: "SpongeBob: Battle for Bikini Bottom", category: "Action", thumb: null, downloadUrl: "#", desc: "Rehydrated classic" },
      { id: 445, name: "Star Wars Jedi: Survivor", category: "Action", thumb: null, downloadUrl: "#", desc: "Cal Kestis returns" },
      { id: 446, name: "Stellar Blade", category: "Action", thumb: null, downloadUrl: "#", desc: "Eve vs Naytibas" },
      { id: 447, name: "Stellaris Ultimate Bundle", category: "Strategy", thumb: null, downloadUrl: "#", desc: "Sci-fi 4X strategy" },
      { id: 448, name: "Still Wakes the Deep", category: "Horror", thumb: null, downloadUrl: "#", desc: "Scottish oil rig horror" },
      { id: 449, name: "Stoneshard", category: "RPG", thumb: null, downloadUrl: "#", desc: "Harsh roguelite RPG" },
      { id: 450, name: "Stormworks: Build and Rescue", category: "Simulation", thumb: null, downloadUrl: "#", desc: "Vehicle builder rescue" },
      { id: 451, name: "Streets of Rage 4", category: "Action", thumb: null, downloadUrl: "#", desc: "Beat-em-up revival" },
      { id: 452, name: "Subnautica 2", category: "Survival", thumb: null, downloadUrl: "#", desc: "New alien ocean" },
      { id: 453, name: "Suicide Squad: Kill the Justice League", category: "Shooter", thumb: null, downloadUrl: "#", desc: "Squad vs heroes" },
      { id: 454, name: "SULFUR", category: "Shooter", thumb: null, downloadUrl: "#", desc: "Occult FPS" },
      { id: 455, name: "Supermarket Simulator", category: "Simulation", thumb: null, downloadUrl: "#", desc: "Grocery store tycoon" },
      { id: 456, name: "SWORN", category: "Action", thumb: null, downloadUrl: "#", desc: "Co-op action roguelite" },
      { id: 457, name: "Tactical Breach Wizards", category: "Strategy", thumb: null, downloadUrl: "#", desc: "Tactical wizard squad" },
      { id: 458, name: "Teardown", category: "Action", thumb: null, downloadUrl: "#", desc: "Voxel destruction heist" },
      { id: 459, name: "Teenage Mutant Ninja Turtles: Shredder's Revenge", category: "Action", thumb: null, downloadUrl: "#", desc: "TMNT beat-em-up" },
      { id: 460, name: "TEKKEN 8", category: "Fighting", thumb: null, downloadUrl: "#", desc: "Latest Tekken" },
      { id: 461, name: "Tempest Rising", category: "Strategy", thumb: null, downloadUrl: "#", desc: "Classic RTS revival" },
      { id: 462, name: "Terraria (v1.4.5)", category: "Indie", thumb: null, downloadUrl: "#", desc: "Latest Terraria update" },
      { id: 463, name: "Test Drive Unlimited Solar Crown", category: "Racing", thumb: null, downloadUrl: "#", desc: "Open world racer" },
      { id: 464, name: "The Riftbreaker", category: "Strategy", thumb: null, downloadUrl: "#", desc: "Base building action" },
      { id: 465, name: "Trails in the Sky 1st Chapter", category: "RPG", thumb: null, downloadUrl: "#", desc: "Classic JRPG" },
      { id: 466, name: "Transport Fever 2", category: "Simulation", thumb: null, downloadUrl: "#", desc: "Transport tycoon" },
      { id: 467, name: "Trek to Yomi", category: "Action", thumb: null, downloadUrl: "#", desc: "Samurai noir" },
      { id: 468, name: "Trepang2", category: "Shooter", thumb: null, downloadUrl: "#", desc: "F.E.A.R.-inspired FPS" },
      { id: 469, name: "Tropico 6", category: "Simulation", thumb: null, downloadUrl: "#", desc: "Island dictator sim" },
      { id: 470, name: "TUNIC", category: "Adventure", thumb: null, downloadUrl: "#", desc: "Fox adventure mystery" },
      { id: 471, name: "Two Point Campus", category: "Simulation", thumb: null, downloadUrl: "#", desc: "University tycoon" },
      { id: 472, name: "UBOAT", category: "Simulation", thumb: null, downloadUrl: "#", desc: "WWII submarine sim" },
      { id: 473, name: "UFO 50", category: "Indie", thumb: null, downloadUrl: "#", desc: "50 retro games" },
      { id: 474, name: "ULTRAKILL", category: "Shooter", thumb: null, downloadUrl: "#", desc: "Blood-fueled demon killer" },
      { id: 475, name: "UNCHARTED: Legacy of Thieves Collection", category: "Adventure", thumb: null, downloadUrl: "#", desc: "Nathan Drake collection" },
      { id: 476, name: "Undertale", category: "Indie", thumb: null, downloadUrl: "#", desc: "RPG where no one dies" },
      { id: 477, name: "Universe Sandbox", category: "Simulation", thumb: null, downloadUrl: "#", desc: "Space physics sandbox" },
      { id: 478, name: "Unpacking", category: "Indie", thumb: null, downloadUrl: "#", desc: "Cozy unpacking puzzle" },
      { id: 479, name: "Until Dawn (2024)", category: "Horror", thumb: null, downloadUrl: "#", desc: "PC remake survival horror" },
      { id: 480, name: "V Rising", category: "Survival", thumb: null, downloadUrl: "#", desc: "Vampire survival" },
      { id: 481, name: "Vampire Survivors", category: "Indie", thumb: null, downloadUrl: "#", desc: "Bullet-heaven survivor" },
      { id: 482, name: "Vampire: The Masquerade – Bloodlines 2", category: "RPG", thumb: null, downloadUrl: "#", desc: "Vampire RPG sequel" },
      { id: 483, name: "Victoria 3", category: "Strategy", thumb: null, downloadUrl: "#", desc: "Victorian grand strategy" },
      { id: 484, name: "Viewfinder", category: "Indie", thumb: null, downloadUrl: "#", desc: "Reality-bending puzzle" },
      { id: 485, name: "Vintage Story", category: "Simulation", thumb: null, downloadUrl: "#", desc: "Deep survival sandbox" },
      { id: 486, name: "Visage", category: "Horror", thumb: null, downloadUrl: "#", desc: "Psychological P.T. horror" },
      { id: 487, name: "Warhammer 40,000: Space Marine 2", category: "Action", thumb: null, downloadUrl: "#", desc: "Titus vs Tyranids" },
      { id: 488, name: "Warhammer: Vermintide 2", category: "Action", thumb: null, downloadUrl: "#", desc: "Co-op rat slaying" },
      { id: 489, name: "Wartales", category: "RPG", thumb: null, downloadUrl: "#", desc: "Medieval mercenary RPG" },
      { id: 490, name: "Watch Dogs 2", category: "Open World", thumb: null, downloadUrl: "#", desc: "San Francisco hacking" },
      { id: 491, name: "We Happy Few", category: "Survival", thumb: null, downloadUrl: "#", desc: "British dystopia" },
      { id: 492, name: "WILD HEARTS", category: "Action", thumb: null, downloadUrl: "#", desc: "Karakuri monster hunt" },
      { id: 493, name: "Wo Long: Fallen Dynasty", category: "Action", thumb: null, downloadUrl: "#", desc: "Three Kingdoms souls" },
      { id: 494, name: "Wolfenstein II: The New Colossus", category: "Shooter", thumb: null, downloadUrl: "#", desc: "Nazi-killing sequel" },
      { id: 495, name: "World War Z: Aftermath", category: "Shooter", thumb: null, downloadUrl: "#", desc: "Co-op zombie horde" },
      { id: 496, name: "Worshippers of Cthulhu", category: "Strategy", thumb: null, downloadUrl: "#", desc: "Cult city builder" },
      { id: 497, name: "Wreckfest 2", category: "Racing", thumb: null, downloadUrl: "#", desc: "Demolition derby sequel" },
      { id: 498, name: "WUCHANG: Fallen Feathers", category: "Action", thumb: null, downloadUrl: "#", desc: "Chinese fantasy souls" },
      { id: 499, name: "WWE 2K25", category: "Sports", thumb: null, downloadUrl: "#", desc: "Wrestling simulation" },
      { id: 500, name: "Yakuza 0", category: "Action", thumb: null, downloadUrl: "#", desc: "1980s Yakuza prequel" },
      { id: 501, name: "Yakuza: Like A Dragon", category: "RPG", thumb: null, downloadUrl: "#", desc: "Turn-based Yakuza" },
      { id: 502, name: "Yes, Your Grace 2: Snowfall", category: "Strategy", thumb: null, downloadUrl: "#", desc: "Medieval kingdom" },
      { id: 503, name: "Yooka-Replaylee", category: "Adventure", thumb: null, downloadUrl: "#", desc: "Platformer remaster" },
      { id: 504, name: "Zero Sievert", category: "Shooter", thumb: null, downloadUrl: "#", desc: "Tarkov-inspired top-down" }
    ];

    const seen = new Map();
    const GAMES_CATALOG = [];
    let duplicates = 0;
    for (const game of RAW_CATALOG) {
      const key = game.name.toLowerCase();
      if (!seen.has(key)) {
        seen.set(key, true);
        GAMES_CATALOG.push(game);
      } else {
        duplicates++;
        console.warn(`Duplicate removed: "${game.name}" (ID ${game.id})`);
      }
    }
    if (duplicates) console.log(` Removed ${duplicates} duplicates. Final count: ${GAMES_CATALOG.length}`);

    function isPlaceholder(url) {
      return !url || url === "#" || url.includes("placehold.co") || url === "";
    }

    const steamCache = new Map();
    async function fetchSteamThumbnail(gameName) {
      if (steamCache.has(gameName)) return steamCache.get(gameName);
      try {
        const url = `https://store.steampowered.com/api/storesearch?term=${encodeURIComponent(gameName)}&cc=US&l=en`;
        const res = await fetch(url);
        const data = await res.json();
        if (data.items && data.items.length > 0) {
          const appId = data.items[0].id;
          const thumb = `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${appId}/library_600x900.jpg`;
          steamCache.set(gameName, thumb);
          return thumb;
        }
      } catch (e) { console.warn(`Steam fetch failed for ${gameName}`, e); }
      steamCache.set(gameName, null);
      return null;
    }

    async function enhanceThumbnail(img, gameName, currentSrc) {
      if (!isPlaceholder(currentSrc)) return;
      try {
        const stored = JSON.parse(localStorage.getItem('gameThumbCache') || '{}');
        if (stored[gameName] && stored[gameName] !== currentSrc) {
          img.src = stored[gameName];
          return;
        }
      } catch(e) {}
      const real = await fetchSteamThumbnail(gameName);
      if (real) {
        img.src = real;
        try {
          const cache = JSON.parse(localStorage.getItem('gameThumbCache') || '{}');
          cache[gameName] = real;
          localStorage.setItem('gameThumbCache', JSON.stringify(cache));
        } catch(e) {}
      }
    }

    function getThumbUrl(game) {
      if (game.thumb && !isPlaceholder(game.thumb)) return game.thumb;
      return `https://placehold.co/300x450/1e1e2f/7C3AED?text=${encodeURIComponent(game.name)}`;
    }

    // ---------- DOM elements and rendering ----------
    const grid = document.getElementById("gamesGrid");
    const searchInput = document.getElementById("search");
    let activeCategory = "";

    function showToast(msg, duration = 1800) {
      const old = document.querySelector(".toast-msg");
      if (old) old.remove();
      const toast = document.createElement("div");
      toast.className = "toast-msg";
      toast.textContent = msg;
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), duration);
    }

    function renderGames() {
      if (!grid) return;
      const filterText = searchInput ? searchInput.value.toLowerCase() : "";
      const filtered = GAMES_CATALOG.filter(game => {
        const matchName = game.name.toLowerCase().includes(filterText);
        const matchCat = activeCategory === "" || game.category.toLowerCase() === activeCategory.toLowerCase();
        return matchName && matchCat;
      });
      grid.innerHTML = filtered.map(game => `
        <div class="game-card" data-game-id="${game.id}" data-category="${game.category}" data-game-name="${game.name}">
          <div class="thumbnail">
            <img src="${getThumbUrl(game)}" alt="${game.name}" loading="lazy" class="game-thumb" data-game-name="${game.name}">
            <a href="${game.downloadUrl || "#"}" target="_blank" class="quick-download" data-download-link="${game.downloadUrl || "#"}">DOWNLOAD NOW</a>
          </div>
          <div class="game-info">
            <span class="tag">${game.category || "Unknown"}</span>
            <h3>${game.name}</h3>
            <p>${game.desc || ""}</p>
          </div>
        </div>
      `).join('');

      document.querySelectorAll('.game-thumb').forEach(img => {
        const gameName = img.getAttribute('data-game-name');
        const currentSrc = img.src;
        enhanceThumbnail(img, gameName, currentSrc);
      });

      document.querySelectorAll('.quick-download').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const url = btn.getAttribute('data-download-link');
          if (url && url !== "#") showToast("Starting download...", 1500);
          else { e.preventDefault(); showToast("Download link unavailable.", 1500); }
        });
      });

      const title = document.querySelector(".section-title h2");
      if (title) title.textContent = `Games (${filtered.length})`;
    }

    function updateFilters() { renderGames(); }

    if (searchInput) searchInput.addEventListener("input", updateFilters);
    document.querySelectorAll(".nav-dropdown-content [data-category]").forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        activeCategory = link.dataset.category || "";
        renderGames();
      });
    });

    renderGames();

    // Optional: Game List Modal
    const modal = document.getElementById('gameListModal');
    const listBtn = document.getElementById('gameListBtn');
    if (listBtn && modal) {
      const closeSpan = modal.querySelector('.close');
      const listContainer = document.getElementById('gameListContainer');
      const modalSearch = document.getElementById('modalSearch');
      function fillList(filter = '') {
        if (!listContainer) return;
        const filtered = GAMES_CATALOG.filter(g => g.name.toLowerCase().includes(filter.toLowerCase()));
        listContainer.innerHTML = filtered.map(g => `<div class="game-list-item" data-game-id="${g.id}">${g.name}</div>`).join('');
        document.querySelectorAll('.game-list-item').forEach(item => {
          item.addEventListener('click', () => {
            const id = item.dataset.gameId;
            const card = document.querySelector(`.game-card[data-game-id="${id}"]`);
            if (card) { card.scrollIntoView({ behavior: 'smooth', block: 'center' }); modal.style.display = 'none'; }
          });
        });
      }
      listBtn.onclick = () => { fillList(); modal.style.display = 'block'; };
      if (closeSpan) closeSpan.onclick = () => modal.style.display = 'none';
      window.onclick = (e) => { if (e.target === modal) modal.style.display = 'none'; };
      if (modalSearch) modalSearch.addEventListener('input', (e) => fillList(e.target.value));
    }

    // Optional: Stats Overlay
    const totalSpan = document.getElementById('totalGamesCount');
    const hotSpan = document.getElementById('hotPickName');
    if (totalSpan) totalSpan.textContent = GAMES_CATALOG.length;
    if (hotSpan) {
      const updateHot = () => { hotSpan.textContent = GAMES_CATALOG[Math.floor(Math.random() * GAMES_CATALOG.length)].name; };
      updateHot();
      setInterval(updateHot, 10000);
    }
})();
