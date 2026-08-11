from pathlib import Path

import PIL.IcoImagePlugin  # noqa: F401
from PIL import Image, ImageOps


ruta_proyecto = Path(__file__).resolve().parent
ruta_origen = ruta_proyecto / "activos" / "iconos" / "pipo_icono_oficial_v1.png"


if not ruta_origen.exists():
    raise FileNotFoundError(f"No se encontró la imagen de origen: {ruta_origen}")


def crear_imagen_con_relleno(imagen_original, tamaño):
    imagen_reescalada = ImageOps.contain(imagen_original, (tamaño, tamaño))

    lienzo = Image.new("RGBA", (tamaño, tamaño), (0, 0, 0, 0))
    posicion_x = (tamaño - imagen_reescalada.width) // 2
    posicion_y = (tamaño - imagen_reescalada.height) // 2
    lienzo.paste(imagen_reescalada, (posicion_x, posicion_y), imagen_reescalada)
    return lienzo


def crear_favicon(ruta_salida):
    with Image.open(ruta_origen) as imagen_original:
        imagen_original = imagen_original.convert("RGBA")
        imagen_base = crear_imagen_con_relleno(imagen_original, 48)

    imagen_base.save(
        ruta_salida,
        format="ICO",
        sizes=[(16, 16), (32, 32), (48, 48)],
    )

    print(f"Creado: {ruta_salida.relative_to(ruta_proyecto)} -> 16x16, 32x32, 48x48")


crear_favicon(ruta_proyecto / "activos" / "iconos" / "favicon.ico")
