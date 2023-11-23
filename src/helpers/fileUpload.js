import Swal from "sweetalert2/dist/sweetalert2.all";

export const fileUpload = async (file) => {

    const imageIsValid = file.type.split("/")[1];
    console.log(file)
    try {
        if (!file) throw new Error("No existe el archivo");
        if (imageIsValid !== "png" && imageIsValid !== "jpg" && imageIsValid !== "jpeg") {

            Swal.fire({
                title: "Formatos de imagenes no validos",
                text: "Los formatos aceptados son: png, jpg, webp",
                icon: "error"
            })
            throw new Error("Formatos no validos, deben ser imagenes");
        }
        const urlCloudImage = "https://api.cloudinary.com/v1_1/ddmrcuh1a/upload";
        const formData = new FormData();
        formData.append("upload_preset", "images_journal");
        formData.append("file", file);
        const response = await fetch(urlCloudImage, {
            method: "POST",
            body: formData
        })
        if (response.status !== 200) throw new Error("Hubo un problema al subir las imagenes");
        const cloudRes = await response.json();
        return cloudRes.secure_url;
    } catch (error) {
        throw new Error(error.message);
    }

}