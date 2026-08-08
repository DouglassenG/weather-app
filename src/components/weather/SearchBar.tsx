        "use client";

        import { useState, FormEvent } from "react";

        interface SearchBarProps {
        onSearch: (city: string) => void;
        isLoading: boolean;
        }

        export function SearchBar({ onSearch, isLoading }: SearchBarProps) {
        const [city, setCity] = useState("");

        function handleSubmit(event: FormEvent) {
            event.preventDefault();

            const trimmedCity = city.trim();

            if (!trimmedCity) return;

            onSearch(trimmedCity);
        }

        return (
            <form onSubmit={handleSubmit} className="flex gap-2">
            <input
                type="text"
                value={city}
                onChange={(event) => setCity(event.target.value)}
                placeholder="Digite o nome da cidade..."
                disabled={isLoading}
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none disabled:opacity-50"
            />

            <button
                type="submit"
                disabled={isLoading || !city.trim()}
                className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
            >
                {isLoading ? "Buscando..." : "Buscar"}
            </button>
            </form>
        );
    }