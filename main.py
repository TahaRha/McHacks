from PIL import Image
import imagehash
from BW import background_white
from DIFFY import calculate_diff

def is_cryptopunk(path):
    """
    (str) -> bool

    returns boolean value depending if the image in the path is a Cryptopunk or not.
    
    """

    #opening the 

    image = Image.open(path)
    background_white(image)
    avg = 0

    #calculating diff between given image and sample of 10.000 cryptopunks (could be less)
    for i in range(10000):
        compPunk = Image.open("punks/punk"+str(i)+".png")
        diff = calculate_diff(image, compPunk)
        if diff < 3:
            print(i)
            return True
        
        avg += diff

    avg = avg/10000

    print(avg)

    #setting a cutoff that represents maximum bits that could be different between the hashes.
    cutoff = 9.5

    return (avg < cutoff)

"""
print(is_cryptopunk("pics/pp1.png"))

print(is_cryptopunk("pics/pic5.png"))
"""
