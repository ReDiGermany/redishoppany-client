import React from 'react'
import Moveable from './Moveable/Moveable'
import SafeComponent from './SafeComponent'
import IFriend from '../interfaces/IFriend'
import Language from '../language/Language'
import ListHeader from './ListHeader'
import IMoveableButtonProps from '../interfaces/IMoveableButtonProps'

export default class HomeFriendlistListItem extends SafeComponent<{
  list: IFriend[]
  title: string
  cancleInvite?: (_friend: IFriend) => void
  denyInvite?: (_friend: IFriend) => void
  acceptFriend?: (_friend: IFriend) => void
  removeFriend?: (_friend: IFriend) => void
}> {
  getButtons(friend: IFriend) {
    const buttons: IMoveableButtonProps[] = []

    if (this.props.denyInvite) {
      buttons.push({
        name: 'accept',
        color: '#0F0',
        icon: 'check',
        onPress: () => this.props.acceptFriend?.(friend),
      })
    }

    return buttons
  }

  render() {
    return (
      this.props.list.length > 0 && (
        <>
          <ListHeader color="#111" text={Language.get(this.props.title)} />
          {this.props.list.map((friend: IFriend, index) => (
            <Moveable
              key={`out_${friend.id}`}
              name={`${friend.firstName} ${friend.lastName}`}
              onDelete={() => {
                this.props.cancleInvite?.(friend)
                this.props.denyInvite?.(friend)
                this.props.removeFriend?.(friend)
              }}
              last={index === this.props.list.length - 1}
              buttons={this.getButtons(friend)}
            />
          ))}
        </>
      )
    )
  }
}
