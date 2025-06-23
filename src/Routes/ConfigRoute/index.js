import {Admin} from "../../Component/Admin";
import {OverviewUser} from "../../Component/Admin/Content/UserContent";
import {OverviewSong} from "../../Component/Admin/Content/SongContent";
import {StatisticalMain} from "../../Component/Admin/Content/StatisticalContent";
import Login from "../../Login";
import {ManagePlaylists} from "../../Component/Admin/Content/PlaylistContent";
import {DetailPlaylist} from "../../Component/Admin/Content/PlaylistContent/detail";
import {OverviewGenre} from "../../Component/Admin/Content/Genres";

const RoutesConfig = [
    {
        path: "",
        element: <Login/>,
    },
    {
        element: <Admin/>,
        children: [
            {
                path: "/admin-manage-users",
                element: <OverviewUser/>,
            },
            {
                path: "/admin-manage-songs",
                element: <OverviewSong/>,
            },
            {
                path: "/admin-manage-playlists",
                element: <ManagePlaylists/>,
            },
            {
                path: "/admin-statistical",
                element: <StatisticalMain/>,
            },
            {
                path: "detail-playlist/:id",
                element: <DetailPlaylist/>,
            },
            {
                path: "/admin-genres",
                element: <OverviewGenre/>
            }
        ],
    },
];

export default RoutesConfig;
