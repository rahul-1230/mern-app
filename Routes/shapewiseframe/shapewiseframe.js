var shape_frame = {
    "Round": ["Rectangle", "Square", "Aviator", "Cat Eye"],
    "Triangle": ["Rectangle", "Clubmaster", "Oval", "Aviator", "Geometric", "Cat Eye"],
    "Diamond": ["Oval", "Aviator", "Round", "Cat Eye"],
    "Heart": ["Rectangle", "Aviator", "Geometric", "Cat Eye"],
    "Oblong": ["Wayfarcer", "Clubmaster", "Oval", "Aviator", "Round", "Geometric", "Cat Eye"],
    "Oval": ["Rectangle", "Square", "Wayfarcer", "Clubmaster", "Aviator", "Geometric", "Cat Eye"],
    "Square": ["Wayfarcer", "Clubmaster", "Oval", "Aviator", "Round", "Cat Eye"]
}

exports.suitable = (shape) => {
    return shape_frame[shape];
}