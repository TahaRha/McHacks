from PIL import Image
import imagehash
from BW import background_white
from DIFFY import calculate_diff
from random import randint


def mix(image1, image2):
    """
    (Image, Image) -> Image

    mixes two images and returns the result as an Image object.

    """

    #resizing the two images to same dimensions (24x24)
    image2.resize((24, 24))
    image1.resize((24, 24))

    #setting background of both images to white for homogeneity
    background_white(image1)
    background_white(image2)

    #new empty image of 24x24 size
    mixed = Image.new("RGB", ((24, 24)))

    #setting variables for width and height (just so the code can stay generalized)
    width, height = mixed.size

    #filling empty pixels of the mixed image
    for x in range(width):
        for y in range(height):
            if randint(1, 2) == 1:
                chosen_color = image1.getpixel((x, y))
            else:
                chosen_color = image2.getpixel((x, y))

            mixed.putpixel((x, y), chosen_color)

    return mixed

"""
for i in range(0, 30):
    j = randint(0, 29)
    k = randint(0, 29)

    punk1 = Image.open("punks/punk"+str(j)+".png")
    punk2 = Image.open("punks/punk"+str(k)+".png")

    mutant = mix(punk1, punk2)

    mutant.save("mutant-punks/mutant"+str(i)+".png")

    """





