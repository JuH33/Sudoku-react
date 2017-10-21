import React, { Component } from 'react';
import { Button, Divider, Image, List, Card, Icon, Popup } from 'semantic-ui-react'

class Contact extends Component {

    render() {
        return (
            <Popup trigger={<Button content='Contact me' icon='user' labelPosition='left' color='orange' />}
                flowing
                position={'top center'}
                on={'hover'}
                hoverable
                hideOnScroll>
                <Card>
                    <Image src='https://react.semantic-ui.com/assets/images/avatar/large/matthew.png' />
                    <Card.Content>
                        <Card.Header>
                            Julien Boyer
                              </Card.Header>
                        <Card.Meta>
                            <span className='date'>
                                Code since 2016
                                  </span>
                        </Card.Meta>
                        <Card.Description>
                            I'm a full stack developer (C# / Java / Php / Ruby / JS)
                        <Divider />
                            <List>
                                <List.Item>
                                    <List.Icon name='text telephone' />
                                    <List.Content>+33 6 19 19 86 95</List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Icon name='marker' />
                                    <List.Content>Bordeaux, France</List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Icon name='mail' />
                                    <List.Content>
                                        <a href='mailto:jack@semantic-ui.com'>julien.boyer49@orange.fr</a>
                                    </List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Icon name='linkify' />
                                    <List.Content>
                                        <a href='https://github.com/JuH33'>Github</a>
                                    </List.Content>
                                </List.Item>
                            </List>
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <a href="https://www.linkedin.com/in/julien-boyer-8a5420b8/">
                            <Icon name='user' />
                            Linkedin
                    </a>
                    </Card.Content>
                </Card>
            </Popup>
        )
    }
}

export default Contact;