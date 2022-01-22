from PIL import Image
import numpy as np

def background_white(image):
    background_color = max(image.getcolors(image.size[0]*image.size[1]))[1]

    width, height = image.size
    for x in range(width):
        for y in range(height):
            current_color = image.getpixel( (x,y) )
            if current_color == background_color:
                image.putpixel((x,y), (255, 255, 255))