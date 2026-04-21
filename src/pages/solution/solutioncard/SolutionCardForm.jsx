import {
    Card,
    Typography,
    Button,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import BASE_URL from "../../../configs/api";
import Editor from "../../pages/editor/Editor";

export default function SolutionCardForm() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);

    const [formData, setFormData] = useState({
        solutionCatId: "",
        paragraph1: "",
        paragraph2: "",
        paragraph3: "",
        paragraph4: "",
        paragraph5: "",
        paragraph6: "",
    });

    const [svg, setSvg] = useState({
        svg1: null,
        svg2: null,
        svg3: null,
        svg4: null,
        svg5: null,
        svg6: null,
    });

    const [preview, setPreview] = useState("");

    useEffect(() => {

        axios.get(`${BASE_URL}/api/solution-cat`).then((res) => {
            setCategories(res.data);
        });


        if (id) {
            axios.get(`${BASE_URL}/api/solution-card/${id}`).then((res) => {
                setFormData(res.data);
                setPreview(`${BASE_URL}/${res.data.svg}`);
            });
        }
    }, [id]);

    const handle = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();

        Object.entries(formData).forEach(([key, value]) => {
            data.append(key, value || "");
        });

    

        Object.entries(svg).forEach(([key, file]) => {
            if (file) data.append(key, file);
        });

        if (id) {
            await axios.put(`${BASE_URL}/api/solution-card/${id}`, data);
        } else {
            await axios.post(`${BASE_URL}/api/solution-card`, data);
        }

        navigate("/dashboard/solution/solution-card");
    };

    return (
        <Card className="p-10">
            <form onSubmit={handleSubmit} className="space-y-6">


                <Typography>Select Category</Typography>
                <select
                    className="border p-2 w-full"
                    value={formData.solutionCatId}
                    onChange={(e) =>
                        handle("solutionCatId", Number(e.target.value))
                    }
                >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.title.replace(/<[^>]*>/g, "")}
                        </option>
                    ))}
                </select>


                {[1, 2, 3, 4, 5, 6].map((num) => (
                    <div key={num}>
                        <Typography>SVG {num}</Typography>
                        <input
                            type="file"
                            onChange={(e) =>
                                setSvg((prev) => ({
                                    ...prev,
                                    [`svg${num}`]: e.target.files[0],
                                }))
                            }
                        />
                    </div>
                ))}

                {preview && <img src={preview} className="h-20" />}


                <Typography>Paragraph 1</Typography>
                <Editor value={formData.paragraph1} onChange={(v) => handle("paragraph1", v)} />

                <Typography>Paragraph 2</Typography>
                <Editor value={formData.paragraph2} onChange={(v) => handle("paragraph2", v)} />

                <Typography>Paragraph 3</Typography>
                <Editor value={formData.paragraph3} onChange={(v) => handle("paragraph3", v)} />

                <Typography>Paragraph 4</Typography>
                <Editor value={formData.paragraph4} onChange={(v) => handle("paragraph4", v)} />

                <Typography>Paragraph 5</Typography>
                <Editor value={formData.paragraph5} onChange={(v) => handle("paragraph5", v)} />

                <Typography>Paragraph 6</Typography>
                <Editor value={formData.paragraph6} onChange={(v) => handle("paragraph6", v)} />

                <Button type="submit">
                    {id ? "Update" : "Save"}
                </Button>

            </form>
        </Card>
    );
}