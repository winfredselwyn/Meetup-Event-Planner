var NewEvent = React.createClass({
    getInitialState: function() {
        return {
            disabled: true
        };
    },
    
    handleClick: function() {

        let name = document.getElementById('eventName').value;
        let location = document.getElementById('eventLocation').value;
        let add_info = document.getElementById('eventInfo').value;
        let startDate = new Date($('#startDate').val());
        let endDate = new Date($('#endDate').val());
        let foo = $("#eventGuestList").val();
        let guests = String(foo.split(" ").join(", "));
        let hostName = document.getElementById('eventHost').value;

        $.ajax({
            url: '/api/v1/events',
            type: 'POST',
            data: { event: {
                title: name,
                address: location,
                agenda: add_info,
                guests: guests,
                host_name: hostName,
                start_date: startDate,
                end_date: endDate
            }},
            success: (function(event) {
                this.props.handleSubmit(event);
                window.location.href = "https://pure-fortress-81588.herokuapp.com";
            }.bind(this))
        });
    },
    
    validateJS: function() {
        var valid = true;

        if(document.getElementById('dateVal').innerHTML != "Lets get it started!"){
            checkEventDate()     
        }
        valid = valid && checkEventName(document.getElementById('eventName').value) && checkEventDate();
        valid = valid && checkEventHost(document.getElementById('eventHost').value);
        valid = valid && checkEventType(document.getElementById('eventType').value);
        valid = valid && checkGuest();
        valid = valid && checkLocation();

        
        if(valid) {
            this.setState({
                disabled: false
            })
        } else {
            this.setState ({
                disabled: true
            })
        }
    },
    
    render: function() {

        return (
            <div>
                <div className="section landing-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 col-md-offset-2">
                            <small><em>you're almost done!</em></small>
                                <div className="progress">
                                    <div className="progress-bar" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style={{ width: 50 + '%' }}>
                                        <span className="sr-only">60% Complete</span>
                                    </div>
                                </div>
                                <h2 className="text-center">Create an event</h2>

                                    <form className="contact-form" id="newEventForm">
                                        <div className="row">
                                            <div className="col-md-6 col-xs-12">
                                                <label htmlFor="eventName">Give your event a name :</label>
                                                <input type="text" id="eventName" className="form-control" placeholder="e.g Battle of Winterfell" onBlur={this.validateJS} required autoFocus/>
                                                <p id="eventNameVal"><small>Give the event a fun name</small></p>
                                            </div>
                                            <div className="col-md-6 col-xs-12">
                                                <label htmlFor="eventHost">Who's the host?</label>
                                                <input type="text" autoComplete="on" className="form-control" id="eventHost" onBlur={this.validateJS} placeholder="e.g Ramsay Bolton" required/>
                                                <p id="eventHostVal"><small>Who's hosting it?</small></p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12 col-xs-12">
                                                <label htmlFor="startDate">When does it start and end?</label>
                                                <div className="row">
                                                        <div className="col-md-6">
                                                            <label htmlFor="startDate">Start Date/Time </label>
                                                            <input type="datetime-local" className="form-control" onBlur={this.validateJS} id="startDate" required />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <label htmlFor="endDate">End Date/Time </label>
                                                            <input type="datetime-local" className="form-control" onBlur={this.validateJS} id="endDate" required/>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <p id="dateVal"><small>Lets get it started!</small></p>
                                                        </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12 col-xs-12">
                                                <label htmlFor="eventGuestList">Guest list</label>
                                                <input type="text" className="form-control" id="eventGuestList" onBlur={this.validateJS} required/>
                                                <p id="guestList2"><small>Who's coming? (add names and separate with comma ',' after each name)</small></p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12 col-xs-12">
                                                <label htmlFor="eventType">Type of Event</label>
                                                <input className="form-control" id="eventType" list="eventTypeList" onBlur={this.validateJS} placeholder="e.g Party, Meeting" required/>
                                                <p id="eventTypeVal"><small>What kind of event is it?</small></p>
                                                <datalist id="eventTypeList">
                                                    <option value="Party"></option>
                                                    <option value="Meeting"></option>
                                                    <option value="Conference"></option>
                                                    <option value="Seminar"></option>
                                                    <option value="Informal Talk"></option>
                                                </datalist>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12 col-xs-12">
                                                <label htmlFor="eventLocation">Location</label>
                                                <Geosuggest
                                                    id="eventLocation"
                                                    required="required"
                                                    onBlur={this.validateJS}
                                                    className="form-control"
                                                    placeholder="e.g Winterfell" />
                                            <p id="eventLocationVal"><small>Where will the event be held?</small></p>
                                            </div>
                                        </div>
                                        <label htmlFor="eventInfo">ADDITIONAL INFORMATION<small><em> ( optional )</em></small></label>
                                        <textarea id="eventInfo" className="form-control" rows="4" placeholder="e.g Please bring sword, spears and giants."></textarea>
                                        <div className="row">
                                            <div className="col-md-4 col-md-offset-4">
                                                <button className="btn btn-danger btn-block btn-lg btn-fill" disabled={this.state.disabled} id="organize_button" onClick={this.handleClick} >Organize</button>
                                            </div>
                                        </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = NewEvent;