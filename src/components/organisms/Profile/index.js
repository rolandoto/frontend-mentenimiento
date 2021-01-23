import React from "react";
import { Avatar, Text, Input, Button, UploadImage } from "../../atoms";
import { Container } from "../../../layouts";
import "./profile.scss";
import { UserActions } from "../../../@actions";
import { useDispatch } from "react-redux";

export const ProfileData = ({ user }) => (
    <Container extraClass="absolute_center direction_column">
        <Avatar size={70} online />
        <div className="mt-10"></div>
        <Text type="p" text={user.name} weight={700} />
        <div className="separator_top_profile"></div>
        <div className="profile_data">
            <div className="rows text_profile_detail">
                <div className="col5">
                    <Text type="strong" text="Email" weight={700} />
                </div>
                <div className="col7">
                    <Text type="span" text={user.email} />
                </div>
            </div>
            <div className="rows text_profile_detail">
                <div className="col5">
                    <Text type="strong" text="Username" weight={700} />
                </div>
                <div className="col7">
                    <Text type="span" text={user.username} />
                </div>
            </div>
            <div className="rows text_profile_detail">
                <div className="col5">
                    <Text type="strong" text="Teléfono" weight={700} />
                </div>
                <div className="col7">
                    <Text type="span" text={user.phone} />
                </div>
            </div>
            <div className="rows text_profile_detail">
                <div className="col5">
                    <Text type="strong" text="Ciudad" weight={700} />
                </div>
                <div className="col7">
                    <Text type="span" text={user.city} />
                </div>
            </div>
            <div className="rows text_profile_detail">
                <div className="col5">
                    <Text type="strong" text="User ID" weight={700} />
                </div>
                <div className="col7">
                    <Text type="span" text={user._id} />
                </div>
            </div>
        </div>
    </Container>
);

export const EditProfile = ({ user }) => {
    const dispatch = useDispatch();

    const eHandleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData(e.target);
        if (e.target.profileImage.files.length > 0) {
            dispatch(UserActions.updateUser(data));
            e.target.profileImage.value = "";
        } else {
            const user = {
                email: e.target.email.value,
                username: e.target.username.value,
                name: e.target.name.value,
                phone: e.target.phone.value,
                city: e.target.city.value,
            };

            dispatch(UserActions.updateUser(user));
        }
    };

    return (
        <Container extraClass="absolute_center direction_column no_padding">
            <form method="POST" onSubmit={eHandleSubmit}>
                <div className="editProfileData absolute_center direction_column">
                    <UploadImage
                        identifier="profileImage"
                        defaultPhoto={
                            user.profileImage
                                ? process.env.REACT_APP_API +
                                  user.profileImage.folder +
                                  user.profileImage.filename
                                : ""
                        }
                    />
                    <div className="w100">
                        <div className="rows">
                            <div className="col6">
                                <Input
                                    type="text"
                                    defaultValue={user.email}
                                    placeholder="Email"
                                    identifier="email"
                                    min={5}
                                    max={50}
                                    animated
                                />
                            </div>
                            <div className="col6">
                                <Input
                                    type="text"
                                    defaultValue={user.username}
                                    placeholder="Username"
                                    identifier="username"
                                    min={5}
                                    max={30}
                                    animated
                                />
                            </div>
                        </div>
                        <div className="rows">
                            <div className="col6">
                                <Input
                                    type="text"
                                    defaultValue={user.name}
                                    placeholder="Nombre"
                                    identifier="name"
                                    min={5}
                                    max={30}
                                    animated
                                />
                            </div>
                            <div className="col6">
                                <Input
                                    type="text"
                                    defaultValue={user.phone}
                                    placeholder="Teléfono"
                                    identifier="phone"
                                    min={5}
                                    max={30}
                                    animated
                                />
                            </div>
                        </div>
                        <div className="rows">
                            <div className="col6">
                                <Input
                                    type="text"
                                    defaultValue={user.city}
                                    placeholder="Ciudad"
                                    identifier="city"
                                    min={5}
                                    max={30}
                                    animated
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form_action">
                    <Button
                        text="Actualizar perfil"
                        style={{ height: 50 }}
                        variant="secondary"
                    />
                </div>
            </form>
        </Container>
    );
};
