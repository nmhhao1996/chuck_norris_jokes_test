import React from 'react';

export interface SubMenuItemProps {
    title: string;
}

const SubMenuItem: React.FC<SubMenuItemProps> = ({
    title,
}: SubMenuItemProps) => (
    <li className="sub-menu-item">
        <div>
            <a href="javascript:void(0)">{title}</a>
        </div>
    </li>
);

export default SubMenuItem;
