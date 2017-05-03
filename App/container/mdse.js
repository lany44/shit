/**
 * Created by lany44 on 17/3/25.
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  AlertIOS
} from 'react-native';
import {rem, windowHeight, img_server} from '../config/sys_config';
import {API, myFetch} from '../lib/myFetch'

const styles = StyleSheet.create({
  containerWrap: {
    flex: 1,
    margin: .1*rem,
    position: 'relative'
  },
  img: {
    width: '100%',
    height: windowHeight * .4
  },
  rowWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  marginTop: {
    marginTop: .1*rem
  },
  price: {
    fontSize: .8*rem,
    color: 'red',
    fontWeight: 'bold',
    marginRight: .3*rem
  },
  title: {
    fontSize: .5*rem
  },
  desc: {
    fontSize: .3*rem,
    color: 'gray'
  },
  detail: {
    marginTop: .3*rem,
    flex: 1,
    padding: .2*rem,
    paddingTop: 0,
  },
  back: {
    width: 1*rem,
    height: 1*rem,
    position: 'absolute',
    bottom: .3*rem,
    right: .3*rem,
    borderRadius: 100000,
    shadowColor: 'black',
    shadowOffset:{
     width: 0,
     height: -1,
    },
    shadowOpacity: .1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  usrContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative'
  },
  usr_pic: {
    width: 1*rem,
    height: 1*rem,
    borderRadius: 20,
    marginRight: .3*rem
  },
  usr_name: {
    fontWeight: 'bold'
  },
  operation_fav: {
    position: 'absolute',
    right: .5*rem
  }
});


class MdseContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFav: false
    }
  }

  componentDidMount() {
    const mdse_id = this.props.route.item._id;
    const {phoneNumber, accessToken} = this.props.app;
    this.props.isloading(true)
    myFetch(API.getFavStatus, {mdse_id, phoneNumber, accessToken})
      .then(res => {
        this.props.isloading(false)
        if (res.err) {
          return AlertIOS.alert('提示', res.err);
        }
        this.setState({
          isFav: res.isFav
        })
      })
  }

  handleDoFav = () => {
    const mdse_id = this.props.route.item._id;
    const {phoneNumber, accessToken} = this.props.app;
    this.props.isloading(true)
    myFetch(API.star, {
      accessToken,
      mdse_id,
      phoneNumber,
    })
      .then(res => {
        this.props.isloading(false)
        if (res.err) {
          return AlertIOS.alert('提示', res.err);
        }
        this.setState({
          isFav: res.isFav
        })
      })
  }

  render() {
    const {routeTo, route:{item}} = this.props;
    const {isFav} = this.state;
    const img_src = img_server + item.img;
    const createAt = new Date(item.meta.createAt).toLocaleString("zh-cn")
    return (
      <View style={styles.containerWrap}>
        <ScrollView>
          <Image source={{uri: img_src}} style={styles.img}/>
          <View style={[styles.usrContainer, styles.marginTop]}>
            <Image source={require('../asset/2.jpg')} style={styles.usr_pic}/>
            <Text style={styles.usr_name}>{item.author.nickname}</Text>
            <Text
              style={styles.operation_fav}
              onPress={this.handleDoFav}
            >
              {isFav ? '取消收藏' : '添加收藏'}
            </Text>
          </View>
          <View style={[styles.rowWrap, styles.marginTop]}>
            <View style={styles.rowWrap}>
              <View>
                <Text>名称: </Text>
              </View>
              <View>
                <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.desc} numberOfLines={1}>{item.desc}</Text>
              </View>
            </View>
            <View>
              <Text style={styles.price}>¥{item.price}</Text>
            </View>
          </View>
          <Text style={styles.marginTop}>校区: {item.position}</Text>
          <Text style={styles.marginTop}>成色: {item.percent}%</Text>
          <Text style={styles.marginTop}>电话: {item.author.phoneNumber}</Text>
          <Text style={styles.marginTop}>发布时间: {createAt}</Text>
          <Text style={styles.detail}>
            {item.detail}
          </Text>
        </ScrollView>
        <View style={styles.back}>
          <Text
            style={styles.backText}
            onPress={()=>routeTo('list')}
          >返回</Text>
        </View>
      </View>
    );
  }
}

export default MdseContainer;
