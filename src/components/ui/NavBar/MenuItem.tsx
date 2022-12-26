import React from 'react';
import { SubMenuItemProps } from './SubMenuItem';

interface MenuItemProps {
    title: string;
    children?: React.ReactElement<SubMenuItemProps>[];
}

const MenuItem: React.FC<MenuItemProps> = ({
    title,
    children,
}: MenuItemProps) => {
    const hasSubmenu: boolean = !!children && children.length > 0;
    return (
        <a
            className={[
                'navbar__menu-item',
                hasSubmenu ? 'has-sub-menu' : '',
            ].join(' ')}
            href="javascript:void(0)"
        >
            {hasSubmenu && <i className="icon-shape before-icon" />}
            {title}
            {hasSubmenu && (
                <div className="after-icon">
                    <i className="icon-path" />
                    <div className="dropdown-triangle" />
                </div>
            )}
            {hasSubmenu && <ul className="dropdown">{children}</ul>}
        </a>
    );
};

export default MenuItem;
