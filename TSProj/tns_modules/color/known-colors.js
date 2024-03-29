exports.AliceBlue = "#F0F8FF";
exports.AntiqueWhite = "#FAEBD7";
exports.Aqua = "#00FFFF";
exports.Aquamarine = "#7FFFD4";
exports.Azure = "#F0FFFF";
exports.Beige = "#F5F5DC";
exports.Bisque = "#FFE4C4";
exports.Black = "#000000";
exports.BlanchedAlmond = "#FFEBCD";
exports.Blue = "#0000FF";
exports.BlueViolet = "#8A2BE2";
exports.Brown = "#A52A2A";
exports.BurlyWood = "#DEB887";
exports.CadetBlue = "#5F9EA0";
exports.Chartreuse = "#7FFF00";
exports.Chocolate = "#D2691E";
exports.Coral = "#FF7F50";
exports.CornflowerBlue = "#6495ED";
exports.Cornsilk = "#FFF8DC";
exports.Crimson = "#DC143C";
exports.Cyan = "#00FFFF";
exports.DarkBlue = "#00008B";
exports.DarkCyan = "#008B8B";
exports.DarkGoldenRod = "#B8860B";
exports.DarkGray = "#A9A9A9";
exports.DarkGreen = "#006400";
exports.DarkKhaki = "#BDB76B";
exports.DarkMagenta = "#8B008B";
exports.DarkOliveGreen = "#556B2F";
exports.DarkOrange = "#FF8C00";
exports.DarkOrchid = "#9932CC";
exports.DarkRed = "#8B0000";
exports.DarkSalmon = "#E9967A";
exports.DarkSeaGreen = "#8FBC8F";
exports.DarkSlateBlue = "#483D8B";
exports.DarkSlateGray = "#2F4F4F";
exports.DarkTurquoise = "#00CED1";
exports.DarkViolet = "#9400D3";
exports.DeepPink = "#FF1493";
exports.DeepSkyBlue = "#00BFFF";
exports.DimGray = "#696969";
exports.DodgerBlue = "#1E90FF";
exports.FireBrick = "#B22222";
exports.FloralWhite = "#FFFAF0";
exports.ForestGreen = "#228B22";
exports.Fuchsia = "#FF00FF";
exports.Gainsboro = "#DCDCDC";
exports.GhostWhite = "#F8F8FF";
exports.Gold = "#FFD700";
exports.GoldenRod = "#DAA520";
exports.Gray = "#808080";
exports.Green = "#008000";
exports.GreenYellow = "#ADFF2F";
exports.HoneyDew = "#F0FFF0";
exports.HotPink = "#FF69B4";
exports.IndianRed = "#CD5C5C";
exports.Indigo = "#4B0082";
exports.Ivory = "#FFFFF0";
exports.Khaki = "#F0E68C";
exports.Lavender = "#E6E6FA";
exports.LavenderBlush = "#FFF0F5";
exports.LawnGreen = "#7CFC00";
exports.LemonChiffon = "#FFFACD";
exports.LightBlue = "#ADD8E6";
exports.LightCoral = "#F08080";
exports.LightCyan = "#E0FFFF";
exports.LightGoldenRodYellow = "#FAFAD2";
exports.LightGray = "#D3D3D3";
exports.LightGreen = "#90EE90";
exports.LightPink = "#FFB6C1";
exports.LightSalmon = "#FFA07A";
exports.LightSeaGreen = "#20B2AA";
exports.LightSkyBlue = "#87CEFA";
exports.LightSlateGray = "#778899";
exports.LightSteelBlue = "#B0C4DE";
exports.LightYellow = "#FFFFE0";
exports.Lime = "#00FF00";
exports.LimeGreen = "#32CD32";
exports.Linen = "#FAF0E6";
exports.Magenta = "#FF00FF";
exports.Maroon = "#800000";
exports.MediumAquaMarine = "#66CDAA";
exports.MediumBlue = "#0000CD";
exports.MediumOrchid = "#BA55D3";
exports.MediumPurple = "#9370DB";
exports.MediumSeaGreen = "#3CB371";
exports.MediumSlateBlue = "#7B68EE";
exports.MediumSpringGreen = "#00FA9A";
exports.MediumTurquoise = "#48D1CC";
exports.MediumVioletRed = "#C71585";
exports.MidnightBlue = "#191970";
exports.MintCream = "#F5FFFA";
exports.MistyRose = "#FFE4E1";
exports.Moccasin = "#FFE4B5";
exports.NavajoWhite = "#FFDEAD";
exports.Navy = "#000080";
exports.OldLace = "#FDF5E6";
exports.Olive = "#808000";
exports.OliveDrab = "#6B8E23";
exports.Orange = "#FFA500";
exports.OrangeRed = "#FF4500";
exports.Orchid = "#DA70D6";
exports.PaleGoldenRod = "#EEE8AA";
exports.PaleGreen = "#98FB98";
exports.PaleTurquoise = "#AFEEEE";
exports.PaleVioletRed = "#DB7093";
exports.PapayaWhip = "#FFEFD5";
exports.PeachPuff = "#FFDAB9";
exports.Peru = "#CD853F";
exports.Pink = "#FFC0CB";
exports.Plum = "#DDA0DD";
exports.PowderBlue = "#B0E0E6";
exports.Purple = "#800080";
exports.Red = "#FF0000";
exports.RosyBrown = "#BC8F8F";
exports.RoyalBlue = "#4169E1";
exports.SaddleBrown = "#8B4513";
exports.Salmon = "#FA8072";
exports.SandyBrown = "#F4A460";
exports.SeaGreen = "#2E8B57";
exports.SeaShell = "#FFF5EE";
exports.Sienna = "#A0522D";
exports.Silver = "#C0C0C0";
exports.SkyBlue = "#87CEEB";
exports.SlateBlue = "#6A5ACD";
exports.SlateGray = "#708090";
exports.Snow = "#FFFAFA";
exports.SpringGreen = "#00FF7F";
exports.SteelBlue = "#4682B4";
exports.Tan = "#D2B48C";
exports.Teal = "#008080";
exports.Thistle = "#D8BFD8";
exports.Tomato = "#FF6347";
exports.Turquoise = "#40E0D0";
exports.Violet = "#EE82EE";
exports.Wheat = "#F5DEB3";
exports.White = "#FFFFFF";
exports.WhiteSmoke = "#F5F5F5";
exports.Yellow = "#FFFF00";
exports.YellowGreen = "#9ACD32";

var _allColors = {};

(function () {
    var name;
    var underscore = "_";
    for (var p in exports) {
        name = p;
        if (name.charAt(0) !== underscore) {
            _allColors[name.toLowerCase()] = exports[p];
        }
    }
})();

function isKnownName(name) {
    if (!name) {
        return undefined;
    }

    return name.toLowerCase() in _allColors;
}
exports.isKnownName = isKnownName;

function getKnownColor(name) {
    if (!name) {
        return undefined;
    }

    return _allColors[name.toLowerCase()];
}
exports.getKnownColor = getKnownColor;
