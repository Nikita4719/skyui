import {
    Card,
    Typography,
    Button,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import BASE_URL from "../../../configs/api";

export default function SolutionTableIconsForm() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");

    const [icons, setIcons] = useState({});
    const [preview, setPreview] = useState({});

    useEffect(() => {
        if (id) {
            axios.get(`${BASE_URL}/api/solution-table-icons/${id}`)
                .then(res => {
                    setTitle(res.data.title);

                    const previews = {};
                    for (let i = 1; i <= 10; i++) {
                        previews[`icon${i}`] = res.data[`icon${i}`]
                            ? `${BASE_URL}/${res.data[`icon${i}`]}`
                            : "";
                    }
                    setPreview(previews);
                });
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("title", title);

        Object.entries(icons).forEach(([key, file]) => {
            if (file) data.append(key, file);
        });

        if (id) {
            await axios.put(`${BASE_URL}/api/solution-table-icons/${id}`, data);
        } else {
            await axios.post(`${BASE_URL}/api/solution-table-icons`, data);
        }

        navigate("/dashboard/solution/solution-table-icons");
    };

    return (
        <Card className="p-10">
            <form onSubmit={handleSubmit} className="space-y-6">

                <Typography>Title</Typography>
                <input
                    className="border p-2 w-full"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                {[...Array(10)].map((_, i) => {
                    const key = `icon${i + 1}`;

                    return (
                        <div key={i}>
                            <Typography>Icon {i + 1}</Typography>

                            <input
                                type="file"
                                onChange={(e) => {
                                    const file = e.target.files[0];

                                    setIcons(prev => ({
                                        ...prev,
                                        [key]: file,
                                    }));

                                    // LIVE PREVIEW
                                    if (file) {
                                        setPreview(prev => ({
                                            ...prev,
                                            [key]: URL.createObjectURL(file),
                                        }));
                                    }
                                }}
                            />

                            {/* SHOW IMAGE */}
                            {preview[key] && (
                                <img
                                    src={preview[key]}
                                    className="h-16 mt-2 border object-contain"
                                />
                            )}
                        </div>
                    );
                })}

                <Button type="submit">
                    {id ? "Update" : "Save"}
                </Button>

            </form>
        </Card>
    );
}