import json
import multi_training
import model


def main():
    convert();
    m = model.Model([300, 300], [100, 50], dropout=0.5)
    pcs = multi_training.loadPieces("music")
    multi_training.trainPiece(m, pcs, 10000)
    gen_adaptive(m, pcs, 10, name="composition")


def convert():
    data = []
    with open('data.json') as data_file:
        data = json.load(data_file)
   
    for (x in range(0, len(data))):
        encoded = data[x].decode("base64").encode("hex")
        file = open(("music/sound" + x + ".txt"), 'w')
        file.write(encoded)

convert()