// {items: [], heading: string}
interface Props {
    items: string[];
    heading?: string;
    // (item: string) => void
    onSelectItem: (item: string) => void;
}

import { useState } from "react";

function Player1Cards({
    items,
    heading = "Uno Trivia! Players",
    onSelectItem,
}: Props) {
    const [selectedIndex, setSelectedIndex] = useState(-1);

    return (
        <>
            <h1>Player 1's Cards</h1>
            {items.length === 0 && <p>No item found</p>}
            <ul className="list-group">
                {items.map((item, index) => (
                    <li
                        className={
                            selectedIndex === index
                                ? "list-group-item active"
                                : "list-group-item"
                        }
                        key={item}
                        onClick={() => {
                            setSelectedIndex(index);
                            onSelectItem(item);
                        }}
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </>
    );
}

export default Player1Cards;
