import { useState } from 'react';
import { ChevronRight, Ruler, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

const SizeChart = ({ title, headers, rows, unit }) => (
    <div className="mb-12">
        <h3 className="text-xl font-black uppercase tracking-tight mb-6 flex items-center gap-3">
            <span className="w-8 h-1 bg-primary inline-block"></span>
            {title}
        </h3>
        <div className="overflow-x-auto bg-dark-800 rounded-xl border border-white/5 shadow-2xl">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                        {headers.map((header, i) => (
                            <th key={header} className={`p-5 text-xs font-black uppercase tracking-widest text-gray-400 ${i === 0 ? 'pl-8' : ''}`}>
                                {header}{i > 0 ? ` (${unit})` : ''}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {rows.map((row, rowIndex) => (
                        <tr key={rowIndex} className="hover:bg-white/5 transition-colors group">
                            {row.map((cell, i) => (
                                <td key={i} className={`p-5 text-sm font-bold ${i === 0 ? 'pl-8 text-white' : 'text-gray-400 group-hover:text-white'}`}>
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

const SizeGuide = () => {
    const [unit, setUnit] = useState('IN'); // 'IN' or 'CM'

    const convert = (value, unit) => {
        if (unit === 'IN') return value;
        // Simple conversion for ranges like "34 - 37"
        return value.split(' - ').map(v => Math.round(parseFloat(v) * 2.54)).join(' - ');
    };

    const charts = [
        {
            title: "Men's Jerseys & Training Tops",
            headers: ["Size", "Chest", "Waist", "Hips"],
            rows: [
                ["S", convert("34 - 37", unit), convert("30 - 32", unit), convert("35 - 37", unit)],
                ["M", convert("37 - 40", unit), convert("32 - 35", unit), convert("37 - 40", unit)],
                ["L", convert("40 - 44", unit), convert("35 - 39", unit), convert("40 - 44", unit)],
                ["XL", convert("44 - 48", unit), convert("39 - 43", unit), convert("44 - 48", unit)],
                ["2XL", convert("48 - 52", unit), convert("43 - 47", unit), convert("48 - 52", unit)]
            ]
        },
        {
            title: "Women's Performance Kits",
            headers: ["Size", "Bust", "Waist", "Hips"],
            rows: [
                ["XS (0-2)", convert("31 - 33", unit), convert("24 - 26", unit), convert("34 - 36", unit)],
                ["S (4-6)", convert("33 - 35", unit), convert("26 - 28", unit), convert("36 - 38", unit)],
                ["M (8-10)", convert("35 - 37", unit), convert("28 - 30", unit), convert("38 - 40", unit)],
                ["L (12-14)", convert("38 - 40", unit), convert("31 - 33", unit), convert("41 - 43", unit)],
                ["XL (16-18)", convert("41 - 43", unit), convert("34 - 36", unit), convert("44 - 46", unit)]
            ]
        },
        {
            title: "Junior / Kids' Gear",
            headers: ["Size / Age", "Height", "Chest", "Waist"],
            rows: [
                ["XS (6-7)", convert("47 - 50", unit), convert("25 - 26", unit), convert("23 - 24", unit)],
                ["S (8-9)", convert("50 - 54", unit), convert("26 - 28", unit), convert("24 - 25", unit)],
                ["M (10-12)", convert("54 - 58", unit), convert("28 - 30", unit), convert("25 - 27", unit)],
                ["L (13-14)", convert("58 - 62", unit), convert("30 - 32", unit), convert("27 - 28", unit)],
                ["XL (15-16)", convert("62 - 66", unit), convert("32 - 35", unit), convert("28 - 30", unit)]
            ]
        }
    ];

    return (
        <div className="pt-24 pb-20 container-custom mx-auto min-h-screen">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-3 text-sm text-gray-400 mb-12 uppercase tracking-wide font-medium">
                <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                <ChevronRight className="w-4 h-4 text-gray-600" />
                <span className="text-white font-bold">Size Guide</span>
            </div>

            <div className="max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <div>
                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 leading-none">Size Guide</h1>
                        <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
                            Find your perfect fit. Our gear is engineered for athlete's bodies—precise, comfortable, and ready for action.
                        </p>
                    </div>

                    {/* Unit Toggle */}
                    <div className="flex bg-dark-800 p-1 rounded-lg border border-white/5 self-start">
                        {['IN', 'CM'].map((u) => (
                            <button
                                key={u}
                                onClick={() => setUnit(u)}
                                className={`px-6 py-2 rounded-md text-xs font-black transition-all ${unit === u ? 'bg-primary text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}
                            >
                                {u}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Measurements Tip */}
                <div className="bg-primary/10 border border-primary/20 rounded-2xl p-8 mb-16 flex flex-col md:flex-row gap-6 items-start md:items-center">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
                        <Ruler className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h4 className="text-xl font-bold uppercase tracking-tight mb-2">How To Measure</h4>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            For the most accurate results, measure while wearing thin clothing. Keep the tape measure level and pulled taut, but not digging into the skin.
                        </p>
                    </div>
                </div>

                {/* Charts */}
                <div className="space-y-4">
                    {charts.map((chart, index) => (
                        <SizeChart key={index} {...chart} unit={unit} />
                    ))}
                </div>

                {/* Fit Tips */}
                <div className="mt-20 p-10 bg-dark-800 rounded-2xl border border-white/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 text-primary mb-4">
                            <Info className="w-6 h-6" />
                            <h4 className="text-lg font-black uppercase tracking-tight">Need More Help?</h4>
                        </div>
                        <p className="text-gray-400 mb-8 max-w-2xl text-sm leading-relaxed">
                            If you're between sizes, we recommend going one size up for a looser "Supporter Fit" or staying true to size for a "Performance / Slim Fit". Still unsure? Chat with our experts.
                        </p>
                        <Link to="/contact">
                            <Button className="uppercase tracking-widest font-black">
                                Contact Support
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default SizeGuide;
