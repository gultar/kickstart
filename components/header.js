import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from '../routes';

const Header = () =>{
    return (
        <Menu style={{ marginTop: '10px' }}>
            <Link href="" route="/" >
                <a href="" className="item">
                    CrowdCoin   
                </a>
            </Link>

            <Menu.Menu position='right'>
                <Link href="" route="/" >
                    <a href="/" className="item">
                        Campaigns 
                    </a>
                </Link>
                <Link href="/campaigns/new" route="/campaigns/new" >
                    <a href="/campaigns/new" className="item">
                        +   
                    </a>
                </Link>
            </Menu.Menu>
        </Menu>
    )
}

export default Header;