import { StyleSheet, Platform } from 'react-native';

const APP_BG = '#F2F2F8';
const TOPBAR_HEIGHT = Platform.OS !== 'ios' ? 64 : 80;;
const CONTAINER_MARGIN_HORIZONTAL = 20;
const CONTAINER_MARGIN_TOP = 20;
const CONTAINER_PADDING = 15;
const CONTAINER_BORDER_RADIUS = 4;
const CONTAINER_BORDER_WIDTH = 4;
const CONTAINER_BORDER_COLOR = '#CFDAF7';
const CONTAINER_BG = '#FEFEFE';
const CONTAINER_SHADOW_COLOR = '#D8D9E9';
const CONTAINER_SHADOW_OFFSET = { width: 2, height: 1 };
const CONTAINER_SHADOW_OPACITY = .9;
const CONTAINER_SHADOW_RADIUS = 2;

const navigator = {
    paddingTop: TOPBAR_HEIGHT,
    // paddingBottom: 30,
    backgroundColor: APP_BG,
};

const containerBordered = {
    borderTopWidth: CONTAINER_BORDER_WIDTH,
    borderTopColor: CONTAINER_BORDER_COLOR,
    elevation: 1,
}

if (Platform.OS === 'ios') {
    containerBordered.borderTopLeftRadius = CONTAINER_BORDER_RADIUS;
    containerBordered.borderTopRightRadius = CONTAINER_BORDER_RADIUS;
}

const container = {
    backgroundColor: CONTAINER_BG,
    marginTop: CONTAINER_MARGIN_TOP,
    marginLeft: CONTAINER_MARGIN_HORIZONTAL,
    marginRight: CONTAINER_MARGIN_HORIZONTAL,
}

const containerContent = {
    backgroundColor: CONTAINER_BG,
    marginTop: CONTAINER_MARGIN_TOP,
    marginLeft: CONTAINER_MARGIN_HORIZONTAL,
    marginRight: CONTAINER_MARGIN_HORIZONTAL,
    padding: CONTAINER_PADDING,
};

const containerContentInset = {
    backgroundColor: CONTAINER_BG,
    padding: CONTAINER_PADDING,
};

const containerShadow = {
    shadowColor: CONTAINER_SHADOW_COLOR,
    shadowOffset: CONTAINER_SHADOW_OFFSET,
    shadowOpacity: CONTAINER_SHADOW_OPACITY,
    shadowRadius: CONTAINER_SHADOW_RADIUS,
};

const containerLast = {
    marginBottom: 30,
};

const listContainer = {
    flexDirection: 'column',
    flex: 1,
};

const listInput = {
    marginLeft: 10,
    padding: 0,
    paddingLeft: 5,
    paddingRight: 5,
    borderColor: '#888',
    borderWidth: 1,
    borderRadius: 5,
    height: 30,
    flex: 1
};

const listRow = {
    paddingBottom: 20,
    flexDirection: 'row',
};

const listImage = {
    width: 50,
    height: 50,
    borderRadius: 25,
};

const listText = {
    flex: 1,
    marginLeft: 20,
    justifyContent: 'center',
};

const listTitle = {
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 14,
};

const listSubTitle = {
    fontWeight: '400',
    fontStyle: 'italic',
    fontSize: 12,
    lineHeight: 12,
    marginTop: 4,
};

const styles = StyleSheet.create({
    navigator,
    container,
    containerContent,
    containerBordered,
    containerShadow,
    containerContentInset,
    containerLast,
    listContainer,
    listInput,
    listRow,
    listImage,
    listText,
    listTitle,
    listSubTitle,
});

export default styles;
