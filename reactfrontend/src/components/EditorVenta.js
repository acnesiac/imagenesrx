import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import {
  EDITORVENTA_PAGE_LOADED,
  VENTA_SUBMITTED,
  EDITORVENTA_PAGE_UNLOADED,
  UPDATE_FIELD_EDITORVENTA, EDITORVENTA_SUBMITTED
} from '../constants/actionTypes';

const mapStateToProps = state => ({
  ...state.editorventa
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload =>
    dispatch({ type: EDITORVENTA_PAGE_LOADED, payload }),
  onSubmit: payload =>
    dispatch({ type: EDITORVENTA_SUBMITTED, payload }),
  onUnload: payload =>
    dispatch({ type: EDITORVENTA_PAGE_UNLOADED }),
  onUpdateField: (key, value) =>
    dispatch({ type: UPDATE_FIELD_EDITORVENTA, key, value })
});

class EditorVenta extends React.Component {
  constructor() {
    super();
    const updateFieldEvent = key => ev => this.props.onUpdateField(key, ev.target.value);

    this.changeCosto = updateFieldEvent('costo');
    this.changeTitle = updateFieldEvent('title');
    this.changeDescription = updateFieldEvent('description');

    this.changeBody = updateFieldEvent('body');

    this.watchForEnter = ev => {
      if (ev.keyCode === 13) {
        ev.preventDefault();
        this.props.onAddTag();
      }
    };

    this.submitForm = ev => {
      ev.preventDefault();
      const venta = {
        title: this.props.title,
        description: this.props.description,
        body: this.props.body,
        costo: this.props.costo
      };
      const slug = { slug: this.props.articleSlug };
      console.log(this.props);
      const promise = this.props.articleSlug ?
        agent.Ventas.update(Object.assign(venta, slug)) :
        agent.Ventas.create(venta);
      this.props.onSubmit(promise);
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.id !== nextProps.match.params.id) {
      if (nextProps.match.params.id) {
        this.props.onUnload();
        return this.props.onLoad(agent.Ventas.get(this.props.match.params.id));
      }
      this.props.onLoad(null);
    }
  }

  componentWillMount() {
    if (this.props.match.params.id) {
      return this.props.onLoad(agent.Diagnosticos.get(this.props.match.params.id));
    }
    this.props.onLoad(null);
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return (
      <div className="editor-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-12 offset-md-0 col-xs-12">
              <form>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Venta titulo"
                      value={this.props.title}
                      onChange={this.changeTitle} />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Descripcion corta"
                      value={this.props.description}
                      onChange={this.changeDescription} />
                  </fieldset>
                  <fieldset className="form-group">
                    <textarea
                      className="form-control"
                      rows="8"
                      placeholder="Escribe tu Descripcion de la venta"
                      value={this.props.body}
                      onChange={this.changeBody}>
                    </textarea>
                  </fieldset>
                  <fieldset className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Costo $"
                    value={this.props.costo}
                    onChange={this.changeCosto} />
                  </fieldset>
                  <button
                    className="btn btn-lg pull-xs-right btn-primary"
                    type="button"
                    disabled={this.props.inProgress}
                    onClick={this.submitForm}>
                    Hacer venta
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditorVenta);
