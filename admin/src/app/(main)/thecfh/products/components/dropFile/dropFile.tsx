import { useDropzone } from "react-dropzone";
import { Box, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import TheCfhPhotoView from "@/src/components/ThecfhPhotoView";
interface IPropDropFile {
  width?: string;
  placeholder?: string;
  placeholderIsDrop?: string;
  listImages?: {
    name: string;
    preview: string;
  };
  onChange?: (files: File[]) => void;
}
export default function DropFile(props: IPropDropFile) {
  const [files, setFiles] = useState<File[]>([]);
  const {
    width,
    placeholder = "Drop file or click choose file upload",
    placeholderIsDrop = "Drop file here...",
    onChange,
  } = props;

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onChange?.(acceptedFiles);
      setFiles((prev) => [...prev, ...acceptedFiles]);
    },
    [onChange]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  const handleClickDeleteImage = (index: number) => {
    const filteredImages = files.splice(index, 0);
    setFiles(filteredImages);
  };
  return (
    <section>
      <Box
        {...getRootProps()}
        sx={{
          width,
          border: "2px dashed",
          borderColor: isDragActive ? "primary.main" : "grey.400",
          borderRadius: 2,
          p: 4,
          textAlign: "center",
          bgcolor: isDragActive ? "grey.100" : "transparent",
          cursor: "pointer",
          transition: "0.2s ease",
          "&:hover": { borderColor: "primary.main" },
        }}
      >
        <input {...getInputProps()} />
        <Typography>
          {isDragActive ? placeholderIsDrop : placeholder}
        </Typography>
      </Box>

      <aside>
        <Typography variant="h6" mt={2}>
          Files:
        </Typography>
        <ul className="flex gap-4">
          {files?.map((file, index) => (
            <li
              key={index}
              className="relative h-24 w-24 aspect-square overflow-hidden"
            >
              <TheCfhPhotoView
                src={URL.createObjectURL(file)}
                className="object-contain w-full h-full"
                alt="images"
                width={96}
                height={96}
              ></TheCfhPhotoView>
              <CloseIcon
                className="absolute top-1 right-1 cursor-pointer"
                sx={{
                  width: "16px",
                  height: "16px",
                }}
                onClick={() => handleClickDeleteImage(index)}
              />
            </li>
          ))}
        </ul>
      </aside>
    </section>
  );
}
