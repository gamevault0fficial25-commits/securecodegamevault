 (function() {
    const GAMES_CATALOG = [
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
      { id: 106, name: "NBA 2K12", category: "Sports", thumb: "https://assets-prd.ignimgs.com/2022/10/11/nba2k12-1665504524388.jpg", downloadUrl: "https://datanodes.to/nux6yifhgm0l/NBA-2K12.rar", desc: "Classic basketball" },
      { id: 107, name: "Marvel’s Spider-Man 2", category: "Action, Adventure", thumb: "https://static.wikia.nocookie.net/spidermanps4/images/d/d4/Marvel%27s_Spider-Man_2_front_cover_%28US%29.png/revision/latest?cb=20230608203237", downloadUrl: "https://datanodes.to/tnapz0kt5cvd/Marvels-Spider-Man-2.rar", desc: "Web-swing NYC" }
    ];

    const grid = document.getElementById("gamesGrid");
    const searchInput = document.getElementById("search");
    let activeCategory = "";

    function showToast(msg, duration = 1800) {
      let existing = document.querySelector('.toast-msg');
      if (existing) existing.remove();
      let toast = document.createElement('div');
      toast.className = 'toast-msg';
      toast.innerText = msg;
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), duration);
    }

    function renderGames() {
      const filterText = searchInput ? searchInput.value.toLowerCase() : "";
      const filtered = GAMES_CATALOG.filter(game => {
        const matchName = game.name.toLowerCase().includes(filterText);
        const matchCat = activeCategory === "" || game.category.toLowerCase() === activeCategory.toLowerCase();
        return matchName && matchCat;
      });
      if (!grid) return;
      grid.innerHTML = filtered.map(game => `
        <div class="game-card" data-game-id="${game.id}" data-category="${game.category}">
          <div class="thumbnail">
            <img src="${game.thumb}" alt="${game.name}" loading="lazy" onerror="this.src='https://placehold.co/300x450?text=Game+Vault'">
            <a href="${game.downloadUrl}" target="_blank" class="quick-download" data-download-link="${game.downloadUrl}">DOWNLOAD NOW</a>
          </div>
          <div class="game-info">
            <span class="tag">${game.category}</span>
            <h3>${game.name}</h3>
            <p>${game.desc}</p>
          </div>
        </div>
      `).join('');

      document.querySelectorAll('.quick-download').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const url = btn.getAttribute('data-download-link');
          showToast(`Download started: ${url.split('/').pop()}`, 1600);
        });
      });
    }

    function updateFilters() {
      renderGames();
    }

    if (searchInput) searchInput.addEventListener('input', updateFilters);
    document.querySelectorAll('.nav-dropdown-content .nav-link').forEach(catLink => {
      catLink.addEventListener('click', (e) => {
        e.preventDefault();
        const cat = catLink.getAttribute('data-category');
        activeCategory = cat || "";
        updateFilters();
      });
    });

    renderGames();
  })();