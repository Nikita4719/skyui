import {
    Card,
    CardBody,
    CardHeader,
    Typography,
    Button,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../../configs/api";

export default function SolutionCards() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    const fetchData = async () => {
        const res = await axios.get(`${BASE_URL}/api/solution-cards`);
        setData(res.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Card className="mt-12 mb-8 px-6">
            <CardHeader
                variant="gradient"
                color="gray"
                className="flex justify-between items-center p-6"
            >
                <Typography variant="h6" color="white">
                    Solution Cards
                </Typography>

                <Button
                    size="sm"
                    color="white"
                    onClick={() =>
                        navigate("/dashboard/solution/solution-cards/add")
                    }
                >
                    Add
                </Button>
            </CardHeader>

            <CardBody className="overflow-x-auto">
                <table className="w-full border table-auto text-sm">
                    <thead className="bg-blue-gray-50">
                        <tr>
                            <th className="border border-blue-gray-200 px-3 py-2">Category</th>
                            <th className="border border-blue-gray-200 px-3 py-2">SVG</th>
                            <th className="border border-blue-gray-200 px-3 py-2">Para1</th>
                            <th className="border border-blue-gray-200 px-3 py-2">Para2</th>
                            <th className="border border-blue-gray-200 px-3 py-2">Para3</th>
                            <th className="border border-blue-gray-200 px-3 py-2">Para4</th>
                            <th className="border border-blue-gray-200 px-3 py-2">Para5</th>
                            <th className="border border-blue-gray-200 px-3 py-2">Para6</th>
                            <th className="border border-blue-gray-200 px-3 py-2">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((item) => (
                            <tr key={item.id}>

                                {/* CATEGORY */}
                                <td className="border border-blue-gray-200 px-3 py-2">
                                    {item.solution_cat?.title.replace(/<[^>]*>/g, "")}
                                </td>

                               
                                <td className="border border-blue-gray-200 px-3 py-2">
                                    <div className="flex gap-2 overflow-x-auto">
                                        {[item.svg1, item.svg2, item.svg3, item.svg4, item.svg5, item.svg6]
                                            .filter(Boolean)
                                            .map((img, i) => (
                                                <img
                                                    key={i}
                                                    src={`${BASE_URL}/${img}`}
                                                    className="h-10 min-w-[40px] object-contain"
                                                    alt=""
                                                />
                                            ))}
                                    </div>
                                </td>

                              
                                <td className="border border-blue-gray-200 px-3 py-2">
                                    <div className="line-clamp-2" dangerouslySetInnerHTML={{ __html: item.paragraph1 }} />
                                </td>

                               
                                <td className="border border-blue-gray-200 px-3 py-2">
                                    <div className="line-clamp-2" dangerouslySetInnerHTML={{ __html: item.paragraph2 }} />
                                </td>

                              
                                <td className="border border-blue-gray-200 px-3 py-2">
                                    <div className="line-clamp-2" dangerouslySetInnerHTML={{ __html: item.paragraph3 }} />
                                </td>

                               
                                <td className="border border-blue-gray-200 px-3 py-2">
                                    <div className="line-clamp-2" dangerouslySetInnerHTML={{ __html: item.paragraph4 }} />
                                </td>

                                
                                <td className="border border-blue-gray-200 px-3 py-2">
                                    <div className="line-clamp-2" dangerouslySetInnerHTML={{ __html: item.paragraph5 }} />
                                </td>

                              
                                <td className="border border-blue-gray-200 px-3 py-2">
                                    <div className="line-clamp-2" dangerouslySetInnerHTML={{ __html: item.paragraph6 }} />
                                </td>

                               
                                <td className="border border-blue-gray-200 px-3 py-2">
                                    <div className="flex gap-2">
                                        <Button
                                            size="sm"
                                            variant="outlined"
                                            onClick={() =>
                                                navigate(`/dashboard/solution/solution-cards/edit/${item.id}`)
                                            }
                                        >
                                            Edit
                                        </Button>

                                        <Button
                                            size="sm"
                                            color="red"
                                            onClick={async () => {
                                                await axios.delete(`${BASE_URL}/api/solution-cards/${item.id}`);
                                                fetchData();
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </CardBody>
        </Card>
    );
}